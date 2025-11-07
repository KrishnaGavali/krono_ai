import { Router } from "express";
import { createGoogleCalendarEvent } from "../../controllers/googleCalendarEvents.ts";

const googleCalendarRouter = Router();

googleCalendarRouter.post("/events/create", createGoogleCalendarEvent);

export default googleCalendarRouter;
