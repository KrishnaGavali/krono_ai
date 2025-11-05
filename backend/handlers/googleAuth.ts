import { OAuth2Client, type OAuth2ClientOptions } from "google-auth-library";
import { googleAuthConfig } from "../config/googleAuthConfig.ts";

const googleOAuthKeys: OAuth2ClientOptions = {
  clientId: googleAuthConfig.clientId,
  clientSecret: googleAuthConfig.clientSecret,
  redirectUri: googleAuthConfig.redirectUri,
};

const oAuth2Client = new OAuth2Client(
  googleOAuthKeys.clientId,
  googleOAuthKeys.clientSecret,
  googleOAuthKeys.redirectUri
);

export default oAuth2Client;
