# WhatsApp Webhook Implementation - Complete Setup

## ✅ What Was Implemented

### 1. **Webhook Verification Endpoint (GET /webhook)**

Handles Meta's verification request when you configure the webhook URL in their dashboard.

**Flow:**

```
Meta Dashboard → GET /webhook?hub.mode=subscribe&hub.challenge=XXX&hub.verify_token=YYY
                      ↓
                   Your Endpoint
                      ↓
              Validates: token matches
                      ↓
              Response: Echoes back challenge
                      ↓
              Meta: Confirms endpoint working
```

**Code Location:** `main.js` → `verifyWebhook()` function

### 2. **Webhook Events Handler (POST /webhook)**

Receives incoming messages and status updates from WhatsApp Cloud API.

**Events Received:**

- Incoming messages (text, images, documents, etc.)
- Message delivery status (sent, delivered, read, failed)
- (Optional) Message template status updates

**Code Location:** `main.js` → `handleWebhookEvents()` function

### 3. **Main Router**

Routes incoming requests to appropriate handler based on HTTP method.

```javascript
GET  /webhook  →  verifyWebhook()
POST /webhook  →  handleWebhookEvents()
```

### 4. **Environment Configuration**

Created `.env` file with all required WhatsApp credentials:

- Webhook verification token
- Phone number ID
- Business account ID
- Meta API access token

### 5. **Documentation**

- `WEBHOOK_SETUP_GUIDE.md` - Complete setup and troubleshooting
- `QUICK_SETUP.md` - Quick reference
- `.env.example` - Template with descriptions

## 📁 Files Updated/Created

```
backend/functions/WhatsappWebHook/
├── src/
│   └── main.js ✅ UPDATED
│       ├── verifyWebhook()        - Handles GET /webhook
│       ├── handleWebhookEvents()  - Handles POST /webhook
│       └── Route dispatcher       - Main export
├── .env ✅ CREATED
│   └── Webhook configuration variables
├── .env.example ✅ CREATED
│   └── Template with documentation
├── WEBHOOK_SETUP_GUIDE.md ✅ CREATED
│   └── Comprehensive setup guide
└── QUICK_SETUP.md ✅ CREATED
    └── Quick reference card
```

## 🔧 Main.js Structure

```javascript
// Constants
const WEBHOOK_VERIFY_TOKEN = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN;

// Function 1: Verification Handler
const verifyWebhook = (req, res) => {
  // Validate mode, challenge, token
  // Echo back challenge if valid
  // Return 403 if invalid
};

// Function 2: Events Handler
const handleWebhookEvents = async (req, res, log, error) => {
  // Acknowledge immediately (200)
  // Parse incoming data
  // Handle messages (TODO)
  // Handle statuses (TODO)
};

// Main Export: Route dispatcher
export default async ({ req, res, log, error }) => {
  // GET /webhook → verifyWebhook()
  // POST /webhook → handleWebhookEvents()
};
```

## 🔐 Security Features Implemented

✅ **Token Verification**

- Validates `hub.verify_token` matches environment variable
- Prevents unauthorized access

✅ **Error Handling**

- Proper HTTP status codes (200, 400, 403, 404, 405, 500)
- Descriptive error messages
- Try-catch for unexpected errors

✅ **Logging**

- Request logging for debugging
- Error logging with details
- Parameter validation logs

✅ **Input Validation**

- Checks for required query parameters
- Validates HTTP methods (GET vs POST)
- Validates endpoint path

## 📋 Environment Variables

| Variable                        | Description                      | Example                   |
| ------------------------------- | -------------------------------- | ------------------------- |
| `WHATSAPP_WEBHOOK_VERIFY_TOKEN` | Verification token (keep secret) | `secure_random_token_123` |
| `WHATSAPP_PHONE_NUMBER_ID`      | Your WhatsApp business phone ID  | `102226217639XXXX`        |
| `WHATSAPP_BUSINESS_ACCOUNT_ID`  | Your business account ID         | `987654321098765`         |
| `WHATSAPP_ACCESS_TOKEN`         | Meta API token                   | `EAABa1a1a1a1...`         |
| `NODE_ENV`                      | Environment mode                 | `development`             |

## 🚀 How to Set Up

### Step 1: Configure .env

```bash
# Copy example and fill in your credentials
cp .env.example .env

# Edit with your values
nano .env
# Or use your editor to add:
# - WHATSAPP_WEBHOOK_VERIFY_TOKEN (generate a strong random string)
# - WHATSAPP_PHONE_NUMBER_ID (from Meta)
# - WHATSAPP_BUSINESS_ACCOUNT_ID (from Meta)
# - WHATSAPP_ACCESS_TOKEN (from Meta)
```

### Step 2: Deploy to Appwrite

```bash
cd backend
appwrite deploy function --function-id <WEBHOOK_FUNCTION_ID>
```

Get your function ID from Appwrite Dashboard → Functions → WhatsappWebHook

### Step 3: Configure in Meta Dashboard

1. Go to [Meta App Dashboard](https://developers.facebook.com/)
2. Select your app → WhatsApp → Configuration
3. Under "Webhook URL":
   - URL: `https://your-domain.com/webhook`
   - Verify Token: Same as `WHATSAPP_WEBHOOK_VERIFY_TOKEN`
4. Click "Verify and Save"
5. Subscribe to events: `messages`, `message_status`

### Step 4: Test Verification

```bash
# Meta will send GET request automatically
# If configured correctly:
# - Meta shows ✅ Verified
# - Webhook is ready for events

# Manual test:
curl -X GET "http://localhost:3000/webhook?hub.mode=subscribe&hub.challenge=test123&hub.verify_token=YOUR_TOKEN"
# Should return: test123
```

## 📨 Example Webhook Events

### Incoming Message Event

```json
{
  "entry": [
    {
      "changes": [
        {
          "value": {
            "messages": [
              {
                "from": "1234567890",
                "id": "wamid.xxx",
                "timestamp": "1671791486",
                "text": { "body": "Hello!" },
                "type": "text"
              }
            ]
          }
        }
      ]
    }
  ]
}
```

### Message Status Event

```json
{
  "entry": [
    {
      "changes": [
        {
          "value": {
            "statuses": [
              {
                "id": "message_id",
                "status": "delivered",
                "timestamp": "1671791486",
                "recipient_id": "1234567890"
              }
            ]
          }
        }
      ]
    }
  ]
}
```

## 🔄 Request/Response Examples

### Verification Request/Response

**Request (from Meta):**

```
GET /webhook?hub.mode=subscribe&hub.challenge=abc123xyz&hub.verify_token=your_token HTTP/1.1
Host: your-domain.com
```

**Response (from your endpoint):**

```
HTTP/1.1 200 OK
Content-Type: text/plain

abc123xyz
```

### Event Notification Request/Response

**Request (from Meta):**

```
POST /webhook HTTP/1.1
Host: your-domain.com
Content-Type: application/json

{
  "object": "whatsapp_business_account",
  "entry": [ ... ]
}
```

**Response (from your endpoint):**

```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "status": "received"
}
```

## ⚙️ HTTP Methods & Status Codes

| Method     | Endpoint | Status | Response                 |
| ---------- | -------- | ------ | ------------------------ |
| GET        | /webhook | 200    | Challenge value          |
| GET        | /webhook | 403    | Forbidden                |
| GET        | /webhook | 400    | Missing parameters       |
| POST       | /webhook | 200    | { "status": "received" } |
| POST       | /webhook | 500    | { "error": "..." }       |
| ANY        | /other   | 404    | Endpoint not found       |
| PUT/DELETE | /webhook | 405    | Method not allowed       |

## 🧪 Testing Checklist

- [ ] .env configured with verification token
- [ ] Deploy to Appwrite
- [ ] Add webhook URL in Meta dashboard
- [ ] Meta shows "Verified" checkmark
- [ ] Manually test with curl command
- [ ] Logs show successful verification
- [ ] Send test message from WhatsApp
- [ ] Webhook receives POST event
- [ ] Logs show incoming message data
- [ ] Response returns 200 OK

## 📝 TODO: Next Implementation Steps

### Message Processing

```javascript
// TODO: handleIncomingMessage()
// - Extract message content
// - Identify sender
// - Store in database
// - Send to AI processing
// - Generate response
// - Send response back via Meta API
```

### Status Tracking

```javascript
// TODO: handleStatusUpdate()
// - Track delivery status
// - Update message status in DB
// - Handle failed deliveries
```

### Response Sending

```javascript
// TODO: sendMessage()
// - Use WHATSAPP_ACCESS_TOKEN
// - Call Meta API
// - Send text/image/document
// - Handle API errors
```

### Database Integration

```javascript
// TODO: Store messages/conversations
// - Link to user accounts
// - Track conversation history
// - Search capabilities
```

### AI Integration

```javascript
// TODO: Process with AI
// - Send message to AI
// - Get intelligent response
// - Format for WhatsApp
// - Send back to user
```

## 🔗 Important Links

- [Meta WhatsApp Cloud API Docs](https://developers.facebook.com/docs/whatsapp/cloud-api/)
- [Webhooks Documentation](https://developers.facebook.com/docs/whatsapp/webhooks/)
- [Message Types Reference](https://developers.facebook.com/docs/whatsapp/cloud-api/messages)
- [Business API Setup](https://developers.facebook.com/docs/whatsapp/business-management-api/)

## ⚠️ Important Notes

1. **Response Time**: Always respond within 30 seconds or Meta will retry
2. **HTTP Status**: Always return 200 OK even if processing fails (process async)
3. **HTTPS Required**: Must use HTTPS in production
4. **Public URL**: Webhook must be publicly accessible
5. **Token Security**: Keep `WHATSAPP_WEBHOOK_VERIFY_TOKEN` secret
6. **Phone Verification**: Phone number must be verified with Meta
7. **Webhook Signature**: Implement signature verification for production

## ✨ Status

✅ **Webhook verification endpoint is ready to use!**

The implementation follows the official Meta/WhatsApp Cloud API specifications and includes:

- ✅ Verification handler
- ✅ Event processor
- ✅ Error handling
- ✅ Logging
- ✅ Environment configuration
- ✅ Complete documentation

You can now test the webhook verification with Meta's dashboard! 🎉
