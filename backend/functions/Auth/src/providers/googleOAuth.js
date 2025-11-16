import { OAuth2Client } from 'google-auth-library';
import { googleConfig } from '../env.js';

const oAuth2Client = new OAuth2Client(
  googleConfig.clientId,
  googleConfig.clientSecret,
  googleConfig.redirect
);

export default oAuth2Client;
