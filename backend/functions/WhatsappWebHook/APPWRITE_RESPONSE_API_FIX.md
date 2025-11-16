# Appwrite Response API - Fix Documentation

## ❌ The Problem

The original code used Express.js-style response methods:
```javascript
res.status(200).send(challenge)      // ❌ Not available in Appwrite
res.status(403).send('Forbidden')    // ❌ Not available in Appwrite
res.json({ error: '...' })           // ❌ Missing status code parameter
```

### Error Message
```
TypeError: res.status is not a function
    at Module.default (file:///usr/local/server/src/function/src/main.js:94:16)
```

**Reason:** Appwrite functions use a different response API than Express.js. The `res` object doesn't have `.status()` method.

---

## ✅ The Solution

Appwrite uses these response methods:

### 1. **res.json(body, statusCode)**
For JSON responses with status code:
```javascript
res.json({ status: 'received' }, 200)
res.json({ error: 'Not found' }, 404)
res.json({ error: 'Internal server error' }, 500)
```

### 2. **res.text(body, statusCode)**
For plain text responses:
```javascript
res.text(challenge, 200)    // Returns just the challenge string
res.text('Forbidden', 403)  // Returns plain text error
```

### 3. **res.send(body)**
Returns with default status 200 (rarely used):
```javascript
res.send(challenge)  // Returns text with 200 status
```

---

## 🔄 What Was Fixed

### Before (Express-style - ❌ BROKEN)
```javascript
return res.status(403).send('Forbidden');
return res.status(400).send('Bad Request - Missing parameters');
return res.status(404).json({ error: 'Endpoint not found' });
return res.status(405).json({ error: 'Method not allowed' });
return res.status(500).json({ error: 'Internal server error' });
```

### After (Appwrite-style - ✅ FIXED)
```javascript
return res.text('Forbidden', 403);
return res.json({ error: 'Bad Request - Missing parameters' }, 400);
return res.json({ error: 'Endpoint not found' }, 404);
return res.json({ error: 'Method not allowed' }, 405);
return res.json({ error: 'Internal server error' }, 500);
```

---

## 📝 Response Method Syntax

```javascript
// JSON response with status code
res.json(
  { key: 'value' },  // Response body (object)
  200                // HTTP status code
)

// Text response with status code
res.text(
  'Some text',       // Response body (string)
  200                // HTTP status code
)

// Plain send (defaults to 200)
res.send('text or json')
```

---

## 🎯 Complete Fixed Code

### Verification Endpoint
```javascript
const verifyWebhook = (req, res) => {
  const mode = req.query['hub.mode'];
  const challenge = req.query['hub.challenge'];
  const token = req.query['hub.verify_token'];

  if (mode && token) {
    if (mode === 'subscribe' && token === WEBHOOK_VERIFY_TOKEN) {
      console.log('✅ Webhook verified successfully');
      return res.text(challenge, 200);  // ✅ Fixed: res.text() instead of res.send()
    } else {
      console.log('❌ Invalid mode or token');
      return res.text('Forbidden', 403);  // ✅ Fixed: res.text() with status code
    }
  } else {
    console.log('❌ Missing required parameters');
    return res.json({ error: 'Bad Request - Missing parameters' }, 400);  // ✅ Fixed: res.json() with status code
  }
};
```

### Event Handler
```javascript
const handleWebhookEvents = async (req, res, log, error) => {
  const body = req.bodyJson || {};

  try {
    log('Webhook event received');
    
    // ✅ Fixed: res.json() with status code as second parameter
    res.json({ status: 'received' }, 200);

    // Process webhook...
    if (body.entry && body.entry[0]) {
      const entry = body.entry[0];
      if (entry.changes && entry.changes[0]) {
        const changes = entry.changes[0];
        const value = changes.value;

        if (value.messages) {
          log('Processing incoming message');
        }

        if (value.statuses) {
          log('Processing message status update');
        }
      }
    }
  } catch (err) {
    error(`Error processing webhook event: ${err.message}`);
    // ✅ Fixed: res.json() with status code
    return res.json({ error: 'Internal server error' }, 500);
  }
};
```

### Main Router
```javascript
export default async ({ req, res, log, error }) => {
  const allowedEndpoints = ['/webhook'];

  if (!allowedEndpoints.includes(req.path)) {
    // ✅ Fixed: res.json() with status code
    return res.json({ error: 'Endpoint not found' }, 404);
  }

  try {
    if (req.path === '/webhook' && req.method === 'GET') {
      return verifyWebhook(req, res);
    }

    if (req.path === '/webhook' && req.method === 'POST') {
      return await handleWebhookEvents(req, res, log, error);
    }

    // ✅ Fixed: res.json() with status code
    return res.json({ error: 'Method not allowed' }, 405);
  } catch (err) {
    error(`Unexpected error: ${err.message}`);
    // ✅ Fixed: res.json() with status code
    return res.json({ error: 'Internal server error' }, 500);
  }
};
```

---

## 📊 Reference Table

| Use Case | Express.js | Appwrite |
|----------|-----------|----------|
| JSON response + status | `res.status(200).json({})` | `res.json({}, 200)` |
| Text response + status | `res.status(200).send('text')` | `res.text('text', 200)` |
| Default 200 status | `res.send('text')` | `res.text('text', 200)` or `res.send('text')` |
| Error JSON | `res.status(400).json({error})` | `res.json({error}, 400)` |
| Not Found | `res.status(404).send()` | `res.json({}, 404)` |

---

## ✨ Key Differences

**Express.js**: Chain methods
```javascript
res.status(200).json({ message: 'OK' })
res.status(404).send('Not Found')
```

**Appwrite**: Pass status as parameter
```javascript
res.json({ message: 'OK' }, 200)
res.text('Not Found', 404)
```

---

## 🚀 Next Steps

1. ✅ Deploy the fixed code
```bash
appwrite deploy function --function-id <ID>
```

2. ✅ Test webhook verification
```bash
curl -X GET "http://localhost:3000/webhook?hub.mode=subscribe&hub.challenge=test123&hub.verify_token=YOUR_TOKEN"
```

3. ✅ Register in Meta dashboard
4. ✅ Start receiving webhook events

---

## 📚 Appwrite Response API Documentation

The corrected webhook now uses the proper Appwrite response methods:

- **res.json(body, statusCode)** - Returns JSON with custom status
- **res.text(body, statusCode)** - Returns text with custom status  
- **res.send(body)** - Returns with default 200 status

All status codes are now properly set! 🎉
