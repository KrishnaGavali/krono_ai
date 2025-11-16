import oAuth2Client from '../providers/googleOAuth.js';
import { googleConfig } from '../env.js';

const handleGoogleAuth = () => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/calendar',
    ],
  });

  return { url: authUrl };
};

export default handleGoogleAuth;
