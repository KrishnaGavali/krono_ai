import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import serverConfig from "./config/serverConfig.ts";
import googleAuthRouter from "./routes/auth/googleCallback.ts";
import googleCalendarRouter from "./routes/calendar/googleCalendar.ts";

const app = express();
const port = serverConfig.port;

// Enable CORS
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Server is Running beautifully ❤️",
  });
});

app.use("/auth", googleAuthRouter);
app.use("/google/calendar", googleCalendarRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
