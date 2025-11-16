# Auth Function Configuration Guide

## Overview

This guide explains the environment variables and configuration needed for the Appwrite Auth Function to work properly with Google OAuth authentication.

## Environment Variables

### Appwrite Configuration

These are your Appwrite project credentials and endpoints:

| Variable                         | Description                             | Example                            |
| -------------------------------- | --------------------------------------- | ---------------------------------- |
| `APPWRITE_API_KEY`               | Appwrite API key for authentication     | `standard_94a5a3e0ae3ec...`        |
| `APPWRITE_ENDPOINT`              | Appwrite Cloud endpoint                 | `https://fra.cloud.appwrite.io/v1` |
| `APPWRITE_FUNCTION_API_ENDPOINT` | Same as endpoint (for function context) | `https://fra.cloud.appwrite.io/v1` |
| `APPWRITE_FUNCTION_PROJECT_ID`   | Your Appwrite Project ID                | `68d9409a002dbc77e02b`             |
| `APPWRITE_DATABASE_ID`           | Database ID for storing users           | `690c01f40007359146fe`             |
| `APPWRITE_USER_TABLE_ID`         | Collection/Table ID for users           | `users`                            |

### Google OAuth Configuration

Set up OAuth credentials in [Google Cloud Console](https://console.cloud.google.com/):

| Variable               | Description              | How to Get                                                |
| ---------------------- | ------------------------ | --------------------------------------------------------- |
| `GOOGLE_CLIENT_ID`     | OAuth Client ID          | Google Cloud Console → Credentials → OAuth 2.0 Client IDs |
| `GOOGLE_CLIENT_SECRET` | OAuth Client Secret      | Same as above                                             |
| `GOOGLE_REDIRECT_URI`  | Callback URL after OAuth | Must match URIs configured in Google Cloud Console        |

**Example:**

```
GOOGLE_CLIENT_ID=1083535204485-vv5f6lt6fo8innargem24oqvaam340aa.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
```

### JWT Configuration

For secure token generation:

| Variable         | Description                       | Default                                |
| ---------------- | --------------------------------- | -------------------------------------- |
| `JWT_SECRET`     | Secret key for signing JWT tokens | Must be set (use strong random string) |
| `JWT_EXPIRES_IN` | Token expiration in seconds       | `86400` (24 hours)                     |

### Frontend Configuration

URLs where the backend redirects after authentication:

| Variable                | Description             | Default                               |
| ----------------------- | ----------------------- | ------------------------------------- |
| `FRONTEND_CALLBACK_URL` | Redirect URL on success | `http://localhost:3001/auth/callback` |
| `FRONTEND_ERROR_URL`    | Redirect URL on error   | `http://localhost:3001/auth/error`    |

### Environment

| Variable   | Description      | Values                      |
| ---------- | ---------------- | --------------------------- |
| `NODE_ENV` | Environment mode | `development`, `production` |

## Setup Instructions

### 1. Local Development

Copy the example file:

```bash
cp .env.example .env
```

Update `.env` with your credentials:

```bash
# Edit .env and add your actual values
nano .env
```

### 2. Appwrite Cloud Deployment

The environment variables are configured in `appwrite.config.json` under the `Auth` function:

```json
"envs": [
  {
    "key": "APPWRITE_API_KEY",
    "value": "your_key_here"
  },
  // ... other variables
]
```

When deploying to Appwrite Cloud:

```bash
appwrite deploy --all
```

### 3. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 Credentials (Web Application)
5. Add authorized redirect URIs:
   - `http://localhost:3000/auth/google/callback` (local development)
   - `https://your-domain.com/auth/google/callback` (production)
6. Copy Client ID and Client Secret to your `.env`

## Authentication Flow

```
User → Frontend
  ↓
Frontend → Backend Auth Function (/auth/google)
  ↓
Backend → Google OAuth Authorization
  ↓
User → Google (grants permission)
  ↓
Google → Backend (/auth/google/callback?code=xxx)
  ↓
Backend → Token Exchange with Google
  ↓
Backend → Get User Info from Google
  ↓
Backend → Check/Create User in Database
  ↓
Backend → Generate JWT Token
  ↓
Backend → Redirect to Frontend (/auth/callback?authStatus=success&jwtToken=xxx)
  ↓
Frontend → Display Success & Redirect to Dashboard
```

## Error Handling

The function handles these error cases:

| Error Code              | Description                        | Solution                        |
| ----------------------- | ---------------------------------- | ------------------------------- |
| `access_denied`         | User denied permissions            | User needs to grant permissions |
| `invalid_code`          | Authorization code invalid/expired | Retry authentication            |
| `token_exchange_failed` | Failed to exchange code for tokens | Check Google credentials        |
| `invalid_user_info`     | Google didn't return user info     | Check scopes in Google OAuth    |
| `user_creation_failed`  | Database error creating user       | Check database credentials      |
| `internal_server_error` | Server error                       | Check server logs               |

## Testing

### Local Testing

```bash
# Start the Auth function locally
appwrite functions createDeployment --function-id <ID> --activate

# Test the endpoints
curl http://localhost:3000/auth/google
curl "http://localhost:3000/auth/google/callback?code=test_code"
```

### Debugging

Enable verbose logging in `appwrite.config.json`:

```json
"logging": true
```

Check function logs in Appwrite Dashboard or via CLI:

```bash
appwrite functions listLogs --function-id <ID>
```

## Security Best Practices

1. **Never commit `.env` file** - Add to `.gitignore`
2. **Use strong JWT_SECRET** - At least 32 characters, random
3. **Rotate credentials periodically** - In production
4. **Use HTTPS in production** - Not just HTTP
5. **Validate redirect URLs** - Only allow whitelisted domains
6. **Keep secrets out of logs** - Check `NODE_ENV` before logging

## Production Checklist

- [ ] Update `GOOGLE_REDIRECT_URI` to production domain
- [ ] Update `FRONTEND_CALLBACK_URL` to production domain
- [ ] Update `FRONTEND_ERROR_URL` to production domain
- [ ] Set `NODE_ENV=production`
- [ ] Use strong `JWT_SECRET` (not the example value)
- [ ] Configure CORS properly
- [ ] Enable HTTPS
- [ ] Set up proper error logging/monitoring

## Troubleshooting

### "Missing JWT_SECRET"

→ Make sure `JWT_SECRET` is set in `.env` or Appwrite function variables

### "Invalid authorization code"

→ Check if Google credentials are correct and redirect URI matches

### "Failed to create user account"

→ Verify database ID and user table ID are correct

### "NextRouter was not mounted"

→ This happens in frontend - ensure `/auth/callback` is a Client Component with `"use client"`

### "useSearchParams() should be wrapped in a suspense boundary"

→ Wrap component with `<Suspense>` - already fixed in updated auth callback

## Support

For issues:

1. Check the error message and code
2. Review relevant section above
3. Check Appwrite logs: `appwrite functions listLogs --function-id <ID>`
4. Enable debug mode: Set `NODE_ENV=development` to see detailed errors
