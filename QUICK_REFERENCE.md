# 🚀 Quick Reference - Auth Function Setup

## Environment Variables at a Glance

```
📦 APPWRITE (6 variables)
├─ APPWRITE_API_KEY           = Your Appwrite API key
├─ APPWRITE_ENDPOINT          = https://fra.cloud.appwrite.io/v1
├─ APPWRITE_FUNCTION_API_ENDPOINT = https://fra.cloud.appwrite.io/v1
├─ APPWRITE_FUNCTION_PROJECT_ID = 68d9409a002dbc77e02b
├─ APPWRITE_DATABASE_ID       = 690c01f40007359146fe
└─ APPWRITE_USER_TABLE_ID     = users

🔐 GOOGLE OAuth (3 variables)
├─ GOOGLE_CLIENT_ID           = From Google Cloud Console
├─ GOOGLE_CLIENT_SECRET       = From Google Cloud Console
└─ GOOGLE_REDIRECT_URI        = http://localhost:3000/auth/google/callback

🎫 JWT (2 variables)
├─ JWT_SECRET                 = KrishnaGavalis_KronoAI_Project
└─ JWT_EXPIRES_IN             = 86400 (seconds = 24 hours)

🌐 FRONTEND (2 variables)
├─ FRONTEND_CALLBACK_URL      = http://localhost:3001/auth/callback
└─ FRONTEND_ERROR_URL         = http://localhost:3001/auth/error

⚙️  ENVIRONMENT (1 variable)
└─ NODE_ENV                   = development
```

## Configuration Files Updated

✅ **`/backend/functions/Auth/.env`**

- Updated with all 15 environment variables
- Currently configured for local development

✅ **`/backend/appwrite.config.json`**

- Added `envs` array to Auth function
- Added `users.read` and `users.write` scopes
- Ready for deployment

✅ **`/backend/functions/Auth/.env.example`**

- Template file for new developers
- Includes descriptions for each variable

✅ **`/backend/functions/Auth/ENV_SETUP_GUIDE.md`**

- Complete setup instructions
- Google OAuth step-by-step guide
- Error handling reference
- Security best practices
- Production checklist

## Quick Start

### Local Development (Already Done ✅)

```bash
# .env is already configured with your values
# Just start the services:

# Terminal 1 - Frontend
cd frontend && npm run dev

# Terminal 2 - Backend
cd backend && npm run dev
```

### Testing Auth Flow

```
1. Go to http://localhost:3001
2. Click "Login with Google"
3. Grant permissions
4. Should redirect to /auth/callback with success message
5. After 5 seconds, redirects to /dashboard
```

### Production Deployment

```bash
# 1. Update URLs to production domain
GOOGLE_REDIRECT_URI=https://your-domain.com/auth/google/callback
FRONTEND_CALLBACK_URL=https://your-domain.com/auth/callback
FRONTEND_ERROR_URL=https://your-domain.com/auth/error

# 2. Use strong JWT secret (32+ chars, random)
JWT_SECRET=<random_strong_secret>

# 3. Deploy
cd backend
appwrite deploy --all
```

## Variables by Purpose

### Frontend Redirect Flow

- `FRONTEND_CALLBACK_URL` → Success redirect
- `FRONTEND_ERROR_URL` → Error redirect

### Database Operations

- `APPWRITE_DATABASE_ID` → Where to store users
- `APPWRITE_USER_TABLE_ID` → User collection
- `APPWRITE_API_KEY` → Authenticate requests

### OAuth Flow

- `GOOGLE_CLIENT_ID` → Identify your app
- `GOOGLE_CLIENT_SECRET` → Sign requests
- `GOOGLE_REDIRECT_URI` → Return URL from Google

### Token Generation

- `JWT_SECRET` → Sign tokens
- `JWT_EXPIRES_IN` → Token lifetime

### Execution Environment

- `APPWRITE_FUNCTION_PROJECT_ID` → Appwrite project context
- `APPWRITE_ENDPOINT` → Appwrite API location
- `NODE_ENV` → Environment mode

## Troubleshooting Checklist

| Issue                       | Solution                                                  |
| --------------------------- | --------------------------------------------------------- |
| "Missing JWT_SECRET"        | Check `.env` file, must be set                            |
| "Invalid Client ID"         | Verify Google credentials in Console                      |
| "Redirect URI mismatch"     | Ensure `GOOGLE_REDIRECT_URI` matches Google Console       |
| "Failed to create user"     | Check `APPWRITE_DATABASE_ID` and `APPWRITE_USER_TABLE_ID` |
| "Can't connect to Appwrite" | Verify `APPWRITE_ENDPOINT` and `APPWRITE_API_KEY`         |
| Frontend shows error page   | Check browser redirect URL includes error params          |
| "User already exists"       | This is normal for return users (treated as login)        |

## Key Files

```
backend/
├── functions/Auth/
│   ├── src/
│   │   ├── main.js (handles routes)
│   │   └── handlers/
│   │       ├── googleAuth.js (init OAuth)
│   │       └── googleAuthCallback.js (handle callback)
│   ├── .env ✅ (CONFIGURED)
│   ├── .env.example ✅ (NEW)
│   └── ENV_SETUP_GUIDE.md ✅ (NEW)
├── appwrite.config.json ✅ (UPDATED)
└── AUTH_SETUP_COMPLETE.md ✅ (NEW)
```

## Next: What to Implement

- [ ] Test complete auth flow end-to-end
- [ ] Create auth context/store in frontend
- [ ] Implement protected routes/middleware
- [ ] Add user profile page
- [ ] Add logout functionality
- [ ] Implement refresh token rotation
- [ ] Add remember-me functionality
- [ ] Set up error pages
- [ ] Configure CORS headers
- [ ] Add rate limiting to auth endpoints

## Support Commands

```bash
# View function logs
appwrite functions listLogs --function-id 69162916001e61cb188a

# Deploy updates
appwrite deploy function --function-id 69162916001e61cb188a

# Test endpoint
curl http://localhost:3000/auth/google

# Check environment
cat backend/functions/Auth/.env
```

---

**Status**: ✅ All environment variables and configurations are set up and ready to use!
