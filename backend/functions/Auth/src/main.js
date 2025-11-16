import { Client, Users, Databases } from 'node-appwrite';
import handleGoogleAuth from './handlers/googleAuth.js';
import handleGoogleAuthCallback from './handlers/googleAuthCallback.js';
import { FrontendConfig } from './env.js';

// Helper function to build redirect URL with query parameters
const buildRedirectUrl = (baseUrl, params) => {
  const url = new URL(baseUrl);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value);
    }
  });
  return url.toString();
};

// This Appwrite function will be executed every time your function is triggered
export default async ({ req, res, log, error }) => {
  const allowedEndpoints = ['/auth/google', '/auth/google/callback'];

  if (!allowedEndpoints.includes(req.path)) {
    const redirectUrl = buildRedirectUrl(FrontendConfig.errorUrl, {
      error: 'forbidden',
      message: 'Endpoint not allowed',
    });
    return res.redirect(redirectUrl, 403);
  }

  try {
    if (req.path === '/auth/google') {
      const authURI = handleGoogleAuth();

      if (!authURI || !authURI.url) {
        const redirectUrl = buildRedirectUrl(FrontendConfig.errorUrl, {
          error: 'auth_init_failed',
          message: 'Failed to initialize Google authentication',
        });
        return res.redirect(redirectUrl, 500);
      }

      return res.redirect(authURI.url, 302);
    }

    if (req.path === '/auth/google/callback') {
      // Check for access denied
      if (req.query.error === 'access_denied') {
        const redirectUrl = buildRedirectUrl(FrontendConfig.errorUrl, {
          error: 'access_denied',
          message: 'User denied access to Google account',
        });
        return res.redirect(redirectUrl, 403);
      }

      // Validate authorization code
      if (!req.query.code) {
        const redirectUrl = buildRedirectUrl(FrontendConfig.errorUrl, {
          error: 'missing_code',
          message: 'Authorization code is missing',
        });
        return res.redirect(redirectUrl, 400);
      }

      const code = req.query.code;
      const data = await handleGoogleAuthCallback(code);

      // Handle authentication errors
      if (data.error) {
        const redirectUrl = buildRedirectUrl(FrontendConfig.errorUrl, {
          error: data.error,
          message: data.message,
        });
        return res.redirect(redirectUrl, data.status || 500);
      }

      // Success response - redirect with auth data
      const redirectUrl = buildRedirectUrl(FrontendConfig.callbackUrl, {
        authStatus: data.authStatus,
        userId: data.userId,
        jwtToken: data.jwtToken,
      });

      return res.redirect(redirectUrl, 302);
    }
  } catch (err) {
    error('Unexpected error in auth endpoint: ' + err.message);

    const redirectUrl = buildRedirectUrl(FrontendConfig.errorUrl, {
      error: 'internal_server_error',
      message: 'An unexpected error occurred',
      errorDetails:
        process.env.NODE_ENV === 'development' ? err.message : undefined,
    });

    return res.redirect(redirectUrl, 500);
  }
};
