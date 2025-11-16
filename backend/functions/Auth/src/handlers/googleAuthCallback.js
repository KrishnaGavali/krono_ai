import oAuth2Client from '../providers/googleOAuth.js';
import { google } from 'googleapis';
import AppwriteUsersDBService from '../service/appwriteUsersDB.js';
import JwtService from '../service/jwtService.js';
import { JwtConfig } from '../env.js';

const handleGoogleAuthCallback = async (code) => {
  if (!code || typeof code !== 'string') {
    return {
      error: 'invalid_code',
      message: 'Authorization code is required and must be a string',
      status: 400,
    };
  }

  if (!JwtConfig.secret) {
    console.error('JWT_SECRET not configured');
    return {
      error: 'server_error',
      message: 'Server configuration error',
      status: 500,
    };
  }

  try {
    // Exchange code for tokens
    const { tokens } = await oAuth2Client.getToken(code);

    if (!tokens || !tokens.access_token) {
      return {
        error: 'token_exchange_failed',
        message: 'Failed to obtain access token from Google',
        status: 401,
      };
    }

    oAuth2Client.setCredentials(tokens);

    // Get user info from Google
    const oauth2 = google.oauth2({
      auth: oAuth2Client,
      version: 'v2',
    });

    const userInfoRes = await oauth2.userinfo.get();
    const userInfo = userInfoRes.data;

    if (!userInfo || !userInfo.email) {
      return {
        error: 'invalid_user_info',
        message: 'Could not retrieve valid user information from Google',
        status: 400,
      };
    }

    // Initialize services
    const appwriteUserService = new AppwriteUsersDBService();
    const jwtService = new JwtService();

    // Check if user exists
    const existingUser = await appwriteUserService.checkExistingUser(
      userInfo.email
    );

    if (existingUser.total === 1) {
      // USER EXISTS - LOGIN
      const user = existingUser.rows[0];

      const jwtPayload = {
        userId: user.$id,
        email: user.email,
        googleId: user.google_id,
        name: user.name,
      };

      const jwtToken = jwtService.generateToken(
        jwtPayload,
        JwtConfig.secret,
        JwtConfig.expiresIn
      );

      return {
        status: 200,
        authStatus: 'login_success',
        message: 'User logged in successfully',
        userId: user.$id,
        jwtToken,
        user: {
          id: user.$id,
          email: user.email,
          name: user.name,
          profileUrl: user.profile_url,
        },
      };
    }

    // USER DOESN'T EXIST - CREATE NEW USER
    const randomPhoneNumber = Math.floor(
      1000000000 + Math.random() * 9000000000
    ).toString();

    const newUserData = {
      google_id: userInfo.id,
      name: userInfo.name,
      email: userInfo.email,
      profile_url: userInfo.picture,
      refresh_token: tokens.refresh_token,
      access_token: tokens.access_token,
      phone: randomPhoneNumber,
    };

    const newUserRes = await appwriteUserService.createNewUser(
      userInfo.id,
      newUserData
    );

    if (!newUserRes || !newUserRes.$id) {
      return {
        error: 'user_creation_failed',
        message: 'Failed to create user account',
        status: 500,
      };
    }

    const jwtPayload = {
      userId: newUserRes.$id,
      email: newUserRes.email,
      googleId: newUserRes.google_id,
      name: newUserRes.name,
    };

    const jwtToken = jwtService.generateToken(
      jwtPayload,
      JwtConfig.secret,
      JwtConfig.expiresIn
    );

    return {
      status: 201,
      authStatus: 'signup_success',
      message: 'User account created successfully',
      userId: newUserRes.$id,
      jwtToken,
      user: {
        id: newUserRes.$id,
        email: newUserRes.email,
        name: newUserRes.name,
        profileUrl: newUserRes.profile_url,
      },
    };
  } catch (err) {
    console.error('Google auth callback error:', err);

    // Handle specific error types
    if (err.message?.includes('Invalid authorization code')) {
      return {
        error: 'invalid_authorization_code',
        message: 'The authorization code is invalid or has expired',
        status: 401,
      };
    }

    if (err.message?.includes('existing user')) {
      return {
        error: 'duplicate_user',
        message: 'User already exists',
        status: 409,
      };
    }

    // Generic error handling
    return {
      error: 'authentication_failed',
      message: 'An error occurred during authentication',
      errorDetails:
        process.env.NODE_ENV === 'development' ? err.message : undefined,
      status: 500,
    };
  }
};

export default handleGoogleAuthCallback;
