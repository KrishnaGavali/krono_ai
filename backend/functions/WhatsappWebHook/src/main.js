/**
 * WhatsApp Cloud API Webhook - Appwrite Functions
 * Author: Krishna
 */

import AppwriteUserDB from './service/UsersDB';
import redis from './providers/redis';

const WEBHOOK_VERIFY_TOKEN =
  process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN || 'krono_ai_webhook_token';

async function sendWhatsAppMessage({ to, message }) {
  const token = process.env.WHATSAPP_TOKEN; // your access token
  const phoneNumberId = '884351904753721'; // your WA phone number ID

  const url = `https://graph.facebook.com/v22.0/${phoneNumberId}/messages`;

  const payload = {
    messaging_product: 'whatsapp',
    to: to,
    type: 'text',
    text: {
      preview_url: false,
      body: message,
    },
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  console.log('WA Response:', data);

  return data;
}

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

            const userPhone = value.messages[0].from;
            const messageText = value.messages[0]?.text?.body || '';

            try {
              const userDB = new AppwriteUserDB();

              // Step 1: Check if message contains auth code format
              if (messageText.startsWith('Authorize:')) {
                const authCode = messageText.split('Authorize:')[1].trim();
                log(`Auth code received: ${authCode}`);

                // Step 2: Check if auth session exists in Redis
                try {
                  const sessionKey = `phone_auth_code:${authCode}`;
                  const sessionData = await redis.get(sessionKey);

                  if (!sessionData) {
                    // Auth session expired or invalid
                    log(`Invalid or expired auth code: ${authCode}`);
                    await sendWhatsAppMessage({
                      to: userPhone,
                      message:
                        'Invalid or expired authentication code. Please generate a new code from the dashboard to continue.',
                    });
                    return;
                  }

                  // Session exists, parse the data
                  const session = JSON.parse(sessionData);
                  log(`Auth session found for userId: ${session.userId}`);

                  // Step 3: Update user's phone connection status
                  await userDB.UpdateUserPhone(session.userId, userPhone);
                  log(`User ${session.userId} phone connected: ${userPhone}`);

                  // Step 4: Delete the used auth code from Redis
                  await redis.del(sessionKey);

                  // Step 5: Send success message
                  await sendWhatsAppMessage({
                    to: userPhone,
                    message: `Welcome ${session.name}! 🎉 Your WhatsApp has been successfully linked to TimelyAI. You can now manage your events and tasks via WhatsApp!`,
                  });
                } catch (redisError) {
                  log(
                    `Redis error checking auth session: ${redisError.message}`
                  );
                  await sendWhatsAppMessage({
                    to: userPhone,
                    message:
                      'An error occurred while verifying your code. Please try again or generate a new code from the dashboard.',
                  });
                }
              } else {
                // Not an auth code message - check if user is connected
                log(`Regular message from ${userPhone}`);

                const userExists = await userDB.UserWithPhoneExists(userPhone);

                if (!userExists) {
                  // User not connected
                  await sendWhatsAppMessage({
                    to: userPhone,
                    message:
                      "Hey! You aren't connected yet. Please generate an authorization code from the TimelyAI dashboard and send it in the format: Authorize:YOUR_CODE",
                  });
                } else {
                  // User is connected - welcome back
                  await sendWhatsAppMessage({
                    to: userPhone,
                    message:
                      'Welcome back! 👋 Please authorize before using TimelyAI. Generate an authorization code from the dashboard and send it here.',
                  });
                }
              }
            } catch (messageError) {
              log(`Error processing message: ${messageError.message}`);
              error(`Message processing error: ${messageError.message}`);
              await sendWhatsAppMessage({
                to: userPhone,
                message: 'An error occurred. Please try again later.',
              });
            }
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
