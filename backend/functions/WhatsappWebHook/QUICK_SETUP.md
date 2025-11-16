# WhatsApp Webhook Quick Reference

## Endpoint URL

```
GET  /webhook  - Verification (called by Meta to verify your URL)
POST /webhook  - Events (incoming messages and status updates)
```

## Implementation in main.js

### Verification (GET)

```javascript
const mode = req.query['hub.mode']; // "subscribe"
const challenge = req.query['hub.challenge']; // Random token to echo back
const token = req.query['hub.verify_token']; // Your verification token

if (mode === 'subscribe' && token === WEBHOOK_VERIFY_TOKEN) {
  res.send(challenge); // Echo back challenge (200 OK)
} else {
  res.status(403).send('Forbidden');
}
```

### Event Processing (POST)

```javascript
// Webhook sends:
{
  "entry": [{
    "changes": [{
      "value": {
        "messages": [/* incoming messages */],
        "statuses": [/* delivery statuses */]
      }
    }]
  }]
}

// Your function should:
// 1. Acknowledge immediately: res.json({ status: "received" })
// 2. Process async: handleMessages(), handleStatuses()
```

## Meta Configuration

**Meta App Dashboard → WhatsApp → Configuration:**

| Field            | Value                                           |
| ---------------- | ----------------------------------------------- |
| Webhook URL      | `https://your-domain.com/webhook`               |
| Verify Token     | Same as `WHATSAPP_WEBHOOK_VERIFY_TOKEN` in .env |
| Subscribe Events | `messages`, `message_status`                    |

## Environment Variables (.env)

```env
WHATSAPP_WEBHOOK_VERIFY_TOKEN=secure_random_token_here
WHATSAPP_PHONE_NUMBER_ID=123456789
WHATSAPP_BUSINESS_ACCOUNT_ID=987654321
WHATSAPP_ACCESS_TOKEN=your_meta_api_token
NODE_ENV=development
```

## Testing

```bash
# Test verification
curl -X GET "http://localhost:3000/webhook?hub.mode=subscribe&hub.challenge=test123&hub.verify_token=secure_random_token_here"

# Should return: test123
```

## Event Types Handled

| Type         | Value                                                                                 |
| ------------ | ------------------------------------------------------------------------------------- |
| **Messages** | text, image, document, audio, video, sticker, location, contacts, button, interactive |
| **Statuses** | sent, delivered, read, failed                                                         |

## Response Codes

| Code | Meaning                                                |
| ---- | ------------------------------------------------------ |
| 200  | Success (always respond with 200 OK within 30 seconds) |
| 403  | Forbidden (invalid token)                              |
| 400  | Bad Request (missing params)                           |
| 405  | Method Not Allowed (wrong HTTP method)                 |
| 500  | Server Error                                           |

## Webhook Flow

```
1. Meta sends verification request (GET)
   ↓
2. Your endpoint validates token and echoes challenge
   ↓
3. Meta confirms endpoint is working
   ↓
4. Meta sends messages as POST requests
   ↓
5. Your endpoint processes and responds with 200
   ↓
6. Meta considers it acknowledged
```

## Files Updated

```
✅ main.js
   - Added verifyWebhook() function
   - Added handleWebhookEvents() function
   - Added main export with routing

✅ .env
   - Added WhatsApp configuration variables

📖 WEBHOOK_SETUP_GUIDE.md
   - Complete setup instructions
   - Meta API documentation links
   - Troubleshooting guide
```

## Important Notes

- ⚠️ Always respond within **30 seconds** or Meta will retry
- ⚠️ Always return **200 OK** even if processing fails
- ⚠️ Use **HTTPS** in production
- ⚠️ Webhook must be **publicly accessible**
- ⚠️ Keep **WHATSAPP_WEBHOOK_VERIFY_TOKEN** secret (like a password)

## Next Steps

1. ✅ Set up .env with verification token
2. ✅ Deploy main.js to Appwrite
3. ✅ Configure webhook in Meta dashboard
4. ✅ Meta will verify your endpoint (GET request)
5. 📝 Implement message handlers
6. 📝 Test with real messages
7. 📝 Add AI processing
8. 📝 Add database storage

---

**Status**: ✅ Webhook verification endpoint is ready!
