import { calendar_v3 } from "googleapis";
import type { OAuth2Client } from "google-auth-library";

const getGoogleCalendarService = (auth: OAuth2Client) => {
  return new calendar_v3.Calendar({
    auth,
  });
};

export { getGoogleCalendarService };
