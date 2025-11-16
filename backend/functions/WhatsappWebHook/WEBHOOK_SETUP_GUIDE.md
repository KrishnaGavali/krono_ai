# WhatsApp Webhook Setup Guide

## Overview

This guide explains how to set up and verify the WhatsApp Cloud API webhook for receiving incoming messages and updates.

## Architecture

```
Meta/WhatsApp Cloud API
         ↓
    Webhook Request
         ↓
   Appwrite Function
    /webhook endpoint
         ↓
  Verification or
  Event Processing
```

## Webhook Verification Flow

### 1. **GET /webhook** - Verification Request

Used by Meta/WhatsApp to verify your webhook URL

**Query Parameters:**

```
hub.mode=subscribe
hub.challenge=abc123xyz789
hub.verify_token=your_verification_token
```

**Verification Logic:**

```javascript
// Your endpoint should:
// 1. Extract query parameters
// 2. Verify token matches WEBHOOK_VERIFY_TOKEN
// 3. Verify mode is "subscribe"
// 4. Echo back the challenge
```

**Example Request:**

```bash
GET https://your-domain.com/webhook?hub.mode=subscribe&hub.challenge=abc123xyz&hub.verify_token=your_token
```

**Successful Response (200):**

```
abc123xyz
```

**Failed Response (403):**

```
Forbidden
```

### 2. **POST /webhook** - Event Notifications

Used by Meta/WhatsApp to send messages and status updates

**Request Body Example:**

```json
{
  "object": "whatsapp_business_account",
  "entry": [
    {
      "id": "ENTRY_ID",
      "changes": [
        {
          "value": {
            "messaging_product": "whatsapp",
            "metadata": {
              "display_phone_number": "1234567890",
              "phone_number_id": "102226217639XXXX"
            },
            "messages": [
              {
                "from": "1234567890",
                "id": "wamid.xxx",
                "timestamp": "1671791486",
                "text": {
                  "body": "Hello, this is a message"
                },
                "type": "text"
              }
            ]
          },
          "field": "messages"
        }
      ]
    }
  ]
}
```

## Setup Instructions

### Step 1: Configure Environment Variables

Edit `/backend/functions/WhatsappWebHook/.env`:

```env
# Your webhook verification token (can be any random string)
WHATSAPP_WEBHOOK_VERIFY_TOKEN=your_secure_random_token

# From Meta Business Manager
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_BUSINESS_ACCOUNT_ID=your_business_account_id
WHATSAPP_ACCESS_TOKEN=your_meta_access_token

NODE_ENV=development
```

### Step 2: Get Meta Credentials

1. Go to [Meta Business Manager](https://business.facebook.com/)
2. Navigate to WhatsApp → Getting Started
3. Create or use existing Business Account
4. Get these credentials:
   - **Phone Number ID**: Your WhatsApp Business phone number ID
   - **Business Account ID**: Your business account ID
   - **Access Token**: Long-lived token for API calls

### Step 3: Deploy to Appwrite

```bash
cd backend
appwrite deploy function --function-id <WEBHOOK_FUNCTION_ID>
```

### Step 4: Register Webhook in Meta

1. Go to [Meta App Dashboard](https://developers.facebook.com/apps/)
2. Select your app → WhatsApp → Configuration
3. In "Webhook URL", enter: `https://your-domain.com/webhook`
4. In "Verify Token", enter the same token as `WHATSAPP_WEBHOOK_VERIFY_TOKEN`
5. Click "Verify and Save"

**Example:**

```
Webhook URL: https://krono-ai.appwrite.io/webhook
Verify Token: your_secure_random_token
```

5. Subscribe to message events:
   - `messages`
   - `message_status`
   - (optional) `message_template_status_update`

## Testing the Webhook

### Manual Verification Test

```bash
# Test webhook verification
curl -X GET "http://localhost:3000/webhook?hub.mode=subscribe&hub.challenge=test_challenge&hub.verify_token=your_token"

# Should return: test_challenge
```

### Using Meta's Test Tool

1. Go to Meta App Dashboard → App Roles → Test Users
2. Select your test phone number
3. Send a test message
4. Check if webhook receives the event

### Debug Logging

Enable detailed logging in `main.js`:

```javascript
console.log('Webhook verification request received');
console.log(`Mode: ${mode}, Token: ${token}`);
```

View logs:

```bash
appwrite functions listLogs --function-id <WEBHOOK_FUNCTION_ID>
```

## Message Types Handled

### Incoming Messages

```json
{
  "type": "text",
  "text": { "body": "Message content" }
}
```

Supported types:

- `text` - Text messages
- `image` - Images
- `document` - Documents/PDFs
- `audio` - Audio files
- `video` - Video files
- `sticker` - Stickers
- `location` - Location data
- `contacts` - Contact information
- `button` - Button interactions
- `interactive` - Interactive messages

### Status Updates

```json
{
  "statuses": [
    {
      "id": "message_id",
      "status": "delivered",
      "timestamp": "1671791486",
      "recipient_id": "1234567890"
    }
  ]
}
```

Status types:

- `sent` - Message sent
- `delivered` - Message delivered
- `read` - Message read
- `failed` - Message failed

## Response Format

All webhook handlers should respond with:

**Success (200):**

```json
{
  "status": "received"
}
```

**Verification (200):**

```
{challenge_value}
```

**Error (400/403/500):**

```json
{
  "error": "Error message"
}
```

## Event Processing Flow

```
1. Receive webhook event (POST /webhook)
2. Validate webhook signature (future enhancement)
3. Parse event data
4. Route to appropriate handler:
   - If messages: handleIncomingMessage()
   - If statuses: handleStatusUpdate()
5. Process asynchronously
6. Return success response immediately
```

## Security Considerations

### 1. Verify Webhook Token

✅ Always verify the token matches before processing

```javascript
if (token !== WEBHOOK_VERIFY_TOKEN) {
  return res.status(403).send('Forbidden');
}
```

### 2. Webhook Signature Verification (Recommended)

Meta includes an `X-Hub-Signature-256` header

```javascript
const crypto = require('crypto');

function verifySignature(body, signature, appSecret) {
  const hash = crypto
    .createHmac('sha256', appSecret)
    .update(body)
    .digest('hex');
  return hash === signature;
}
```

### 3. HTTPS Only

- Always use HTTPS in production
- Update webhook URL to HTTPS endpoint

### 4. Rate Limiting

Implement rate limiting to prevent abuse:

```javascript
// TODO: Add rate limiting middleware
```

### 5. Input Validation

Validate all incoming data:

```javascript
if (!body.entry || !body.entry[0]) {
  return res.status(400).send('Invalid payload');
}
```

## Common Issues & Solutions

| Issue                         | Solution                                                   |
| ----------------------------- | ---------------------------------------------------------- |
| "Webhook verification failed" | Check WEBHOOK_VERIFY_TOKEN matches Meta config             |
| "Connection timeout"          | Ensure webhook URL is publicly accessible (HTTPS)          |
| "Not receiving messages"      | Verify phone number is registered and number ID is correct |
| "401 Unauthorized"            | Update ACCESS_TOKEN or check token expiration              |
| "Invalid signature"           | Implement signature verification with app secret           |
| "Messages in queue"           | Check if webhook returned 200 OK response                  |

## Next Steps

### 1. Implement Message Handlers

```javascript
const handleIncomingMessage = async (message, metadata) => {
  // TODO: Store message in database
  // TODO: Send to AI processing
  // TODO: Generate and send response
};

const handleStatusUpdate = async (status) => {
  // TODO: Update message delivery status
  // TODO: Log delivery failures
};
```

### 2. Add Message Response

```javascript
// Send message via WhatsApp API
const sendMessage = async (phoneNumber, message) => {
  // Use WHATSAPP_ACCESS_TOKEN and PHONE_NUMBER_ID
  // Call Meta API to send message
};
```

### 3. Database Integration

```javascript
// Store messages and conversations
// Link to user accounts
// Track message history
```

### 4. AI Processing

```javascript
// Process incoming messages with AI
// Generate intelligent responses
// Format responses for WhatsApp
```

## Meta API Documentation

- [WhatsApp Cloud API Docs](https://developers.facebook.com/docs/whatsapp/cloud-api/)
- [Webhooks Reference](https://developers.facebook.com/docs/whatsapp/webhooks/components)
- [Message Types](https://developers.facebook.com/docs/whatsapp/cloud-api/messages)
- [Business Account Setup](https://developers.facebook.com/docs/whatsapp/business-management-api/)

## Production Checklist

- [ ] Token is a strong, random string (32+ chars)
- [ ] Webhook URL uses HTTPS
- [ ] Webhook is publicly accessible
- [ ] Phone number is verified with Meta
- [ ] Subscribe to message events is enabled
- [ ] Access token is valid and not expired
- [ ] Implement proper error handling
- [ ] Add message persistence to database
- [ ] Set up logging and monitoring
- [ ] Test with real messages
- [ ] Configure message acknowledgment
- [ ] Implement rate limiting
- [ ] Add webhook signature verification

## Support

For issues:

1. Check Appwrite function logs
2. Verify Meta webhook configuration
3. Test with curl commands
4. Check phone number and token configuration
5. Review Meta's error messages in app logs
