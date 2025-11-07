import type { Request, Response } from "express";
import { getUserAccessToken } from "../utils/appwrite.ts";
import { getOAuth2Client } from "../utils/googleAuth.ts";
import { google } from "googleapis";

interface eventData {
  userId: string;
  summary: string;
  location?: string;
  description?: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  reminders?: {
    useDefault: boolean;
  };
}

const createGoogleCalendarEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  const body: eventData = req.body;

  // Validate required fields
  if (!body.userId || !body.summary || !body.start || !body.end) {
    res.status(400).json({
      error: "Missing required fields: userId, summary, start, end",
    });
    return;
  }

  const tokens = await getUserAccessToken(body.userId);

  if (!tokens || !tokens.accessToken) {
    res.status(404).json({ error: "User access token not found" });
    return;
  }

  const auth = getOAuth2Client(
    tokens.accessToken,
    tokens.refreshToken || undefined
  );

  const calendar = google.calendar({
    version: "v3",
    auth: auth,
  });

  const event = {
    summary: body.summary,
    location: body.location || "Online",
    description: body.description || "Event created by KronoAI",
    start: {
      dateTime: body.start.dateTime,
      timeZone: body.start.timeZone || "Asia/Kolkata",
    },
    end: {
      dateTime: body.end.dateTime,
      timeZone: body.end.timeZone || "Asia/Kolkata",
    },
    reminders: body.reminders || {
      useDefault: true,
    },
  };

  const calendarId = "primary";

  try {
    const response = await calendar.events.insert({
      calendarId: calendarId,
      requestBody: event,
    });

    console.log("Event created:", response.data);
    res.status(201).json({
      message: "Event created successfully",
      eventId: response.data.id,
      eventLink: response.data.htmlLink,
    });
  } catch (error: any) {
    console.error("Error creating event:", error.message);
    res.status(500).json({
      error: "Failed to create event",
      details: error.message,
    });
  }
};

export { createGoogleCalendarEvent };
