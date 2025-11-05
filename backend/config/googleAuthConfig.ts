type googleAuthConfigType = {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
};

export const googleAuthConfig: googleAuthConfigType = {
  clientId: process.env.GOOGLE_CLIENT_ID as string,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  redirectUri: process.env.GOOGLE_REDIRECT_URI as string,
};
