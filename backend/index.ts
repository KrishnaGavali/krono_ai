import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import serverConfig from "./config/serverConfig.ts";
import googleAuthRouter from "./routes/auth/googleCallback.ts";

const app = express();
const port = serverConfig.port;

// Enable CORS
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hello World!",
  });
});

app.use("/auth", googleAuthRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
