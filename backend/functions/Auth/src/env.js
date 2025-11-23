const googleConfig = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirect: process.env.GOOGLE_REDIRECT_URI,
};

const AppwriteConfig = {
  endpoint: process.env.APPWRITE_FUNCTION_API_ENDPOINT,
  projectId: process.env.APPWRITE_FUNCTION_PROJECT_ID,

  databaseId: process.env.APPWRITE_DATABASE_ID,
  usersTableId: process.env.APPWRITE_USER_TABLE_ID,
};

const JwtConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: parseInt(process.env.JWT_EXPIRES_IN || '86400'), // Default 24 hours
};

const FrontendConfig = {
  callbackUrl:
    process.env.FRONTEND_CALLBACK_URL ||
    'https://krono-ai.vercel.app/auth/callback',
};

const FrontendConfigLocal = {
  callbackUrl: 'https://krono-ai.vercel.app/auth/callback',
};

const ENV = process.env.NODE_ENV || 'dev';

if (ENV === 'dev') {
  FrontendConfig.callbackUrl = FrontendConfigLocal.callbackUrl;
}

export {
  googleConfig,
  AppwriteConfig,
  JwtConfig,
  FrontendConfig,
  FrontendConfigLocal,
  ENV,
};
