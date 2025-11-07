import { google } from "googleapis";
import { googleAuthConfig } from "../config/googleAuthConfig.ts";

const getOAuth2Client = (accessToken: string, refreshToken?: string) => {
  const oAuth2Client = new google.auth.OAuth2(
    googleAuthConfig.clientId,
    googleAuthConfig.clientSecret,
    googleAuthConfig.redirectUri
  );

  const credentials: any = {
    access_token: accessToken,
  };

  if (refreshToken) {
    credentials.refresh_token = refreshToken;
  }

  oAuth2Client.setCredentials(credentials);

  return oAuth2Client;
};

export { getOAuth2Client };
