/**
 * WhatsApp Cloud API Webhook - Appwrite Functions
 * Author: Krishna
 */

const WEBHOOK_VERIFY_TOKEN =
  process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN || 'krono_ai_webhook_token';

export default async ({ req, res, log, error }) => {
  // Only allow /webhook endpoint
  if (req.path !== '/webhook') {
    return res.json({ error: 'Not Found' }, 404);
  }

  try {
    /* ---------------------------------------------------------
     * 1. VERIFY WEBHOOK (GET)
     * ---------------------------------------------------------*/
    if (req.method === 'GET') {
      const mode = req.query['hub.mode'];
      const token = req.query['hub.verify_token'];
      let challenge = req.query['hub.challenge'];

      challenge = parseInt(req.query['hub.challenge'], 10);

      log(
        `Verification request: mode=${mode}, token=${token}, challenge=${challenge}`
      );

      if (mode === 'subscribe' && token === WEBHOOK_VERIFY_TOKEN) {
        // MUST return challenge as raw text (no JSON, no quotes)

        return res.send(challenge, 200);
      }

      return res.send('Forbidden', 403);
    }

    /* ---------------------------------------------------------
     * 2. HANDLE WEBHOOK EVENTS (POST)
     * ---------------------------------------------------------*/
    if (req.method === 'POST') {
      const body = req.bodyJson || {};
      log('Webhook POST received');
      log(JSON.stringify(body, null, 2));

      // Always respond fast (important for WhatsApp)
      res.json({ status: 'received' }, 200);

      // Process message asynchronously (non-blocking)
      try {
        if (
          body.entry &&
          body.entry[0]?.changes &&
          body.entry[0].changes[0]?.value
        ) {
          const value = body.entry[0].changes[0].value;

          if (value.messages) {
            log('Incoming user message detected');
            // TODO: handle incoming message
          }

          if (value.statuses) {
            log('Message status update received');
            // TODO: handle status delivery events
          }
        }
      } catch (processingError) {
        error(`Webhook processing error: ${processingError.message}`);
      }

      return res.empty(); // POST already responded
    }

    return res.send('Method Not Allowed', 405);
  } catch (err) {
    error(`Runtime error: ${err.message}`);
    return res.json({ error: 'Internal Server Error' }, 500);
  }
};
