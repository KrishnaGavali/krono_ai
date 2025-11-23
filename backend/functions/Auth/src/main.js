import { Client, Users, Databases } from 'node-appwrite';
import handleGoogleAuth from './handlers/googleAuth.js';
import handleGoogleAuthCallback from './handlers/googleAuthCallback.js';
import { FrontendConfig, JwtConfig } from './env.js';
import AppwriteUsersDBService from './service/appwriteUsersDB.js';
import JwtService from './service/jwtService.js';
import { createPhoneAuthCodeAndSession } from './handlers/handlePhoneAuth.js';

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

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers':
    'Content-Type, Authorization, x-appwrite-project, x-requested-with',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Max-Age': '86400',
};

// This Appwrite function will be executed every time your function is triggered
export default async ({ req, res, log, error }) => {
  if (req.method === 'OPTIONS') {
    return res.send('', 204, corsHeaders);
  }

  const allowedEndpoints = [
    '/auth/google',
    '/auth/google/callback',
    '/auth/get_user_details',
    '/auth/phone/auth_code',
    '/auth/phone/verify_code',
  ];

  log('Received request for path: ' + req.path);

  if (!allowedEndpoints.includes(req.path)) {
    const redirectUrl = buildRedirectUrl(FrontendConfig.callbackUrl, {
      error: 'forbidden',
      message: 'Endpoint not allowed',
    });
    return res.redirect(redirectUrl, 403);
  }

  try {
    if (req.path === '/auth/google') {
      const authURI = handleGoogleAuth();

      if (!authURI || !authURI.url) {
        const redirectUrl = buildRedirectUrl(FrontendConfig.callbackUrl, {
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
        const redirectUrl = buildRedirectUrl(FrontendConfig.callbackUrl, {
          error: 'access_denied',
          message: 'User denied access to Google account',
        });
        return res.redirect(redirectUrl, 403);
      }

      // Validate authorization code
      if (!req.query.code) {
        const redirectUrl = buildRedirectUrl(FrontendConfig.callbackUrl, {
          error: 'missing_code',
          message: 'Authorization code is missing',
        });
        return res.redirect(redirectUrl, 400);
      }

      const code = req.query.code;
      const data = await handleGoogleAuthCallback(code);

      // Handle authentication errors
      if (data.error) {
        const redirectUrl = buildRedirectUrl(FrontendConfig.callbackUrl, {
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

    if (req.path === '/auth/get_user_details') {
      const { userId, jwtToken } = req.query;

      // Validate input
      if (!userId || !jwtToken) {
        return res.json(
          {
            error: 'missing_parameters',
            message: 'userId and jwtToken are required',
          },
          400,
          corsHeaders
        );
      }

      const userDBService = new AppwriteUsersDBService();
      const jwtService = new JwtService();

      const secret = JwtConfig.secret;

      // Verify JWT token
      let payload;

      try {
        payload = jwtService.verifyToken(jwtToken, secret);

        // Check if token userId matches requested userId
        if (payload.userId !== userId) {
          return res.json(
            {
              error: 'unauthorized',
              message: 'Token userId does not match requested userId',
            },
            401,
            corsHeaders
          );
        }

        // Fetch user details from Appwrite
        const userDetails = await userDBService.getBasicUserDetailsById(userId);

        return res.json(
          {
            status: 'success',
            user: userDetails,
          },
          200,
          corsHeaders
        );
      } catch (err) {
        return res.json(
          {
            error: 'unexpected_token_error',
            message: 'JWT token verification failed: ' + err.message,
          },
          401,
          corsHeaders
        );
      }
    }

    if (req.path === '/auth/phone/auth_code') {
      const { name, userId, jwtToken } = req.query;

      // Validate input
      if (!name || !userId || !jwtToken) {
        return res.json(
          {
            error: 'missing_parameters',
            message: 'name, userId, phone, and jwtToken are required',
          },
          400,
          corsHeaders
        );
      }

      try {
        // Verify JWT token
        const jwtService = new JwtService();
        const secret = JwtConfig.secret;

        let payload;
        try {
          payload = jwtService.verifyToken(jwtToken, secret);

          // Check if token userId matches requested userId
          if (payload.userId !== userId) {
            return res.json(
              {
                error: 'unauthorized',
                message: 'Token userId does not match requested userId',
              },
              401,
              corsHeaders
            );
          }
        } catch (tokenError) {
          return res.json(
            {
              error: 'invalid_token',
              message: 'JWT token verification failed: ' + tokenError.message,
            },
            401,
            corsHeaders
          );
        }

        // Create phone auth code and session
        const resData = await createPhoneAuthCodeAndSession({
          name,
          userId,
        });

        console.log('Phone auth code creation response:', resData);

        return res.json(resData, resData.status, corsHeaders);
      } catch (error) {
        return res.json(
          {
            error: 'phone_auth_code_creation_failed',
            message: 'Failed to create phone auth code: ' + error.message,
          },
          500,
          corsHeaders
        );
      }
    }
  } catch (err) {
    error('Unexpected error in auth endpoint: ' + err.message);

    const redirectUrl = buildRedirectUrl(FrontendConfig.callbackUrl, {
      error: 'internal_server_error',
      message: 'An unexpected error occurred',
      errorDetails:
        process.env.NODE_ENV === 'development' ? err.message : undefined,
    });

    return res.redirect(redirectUrl, 500);
  }
};
