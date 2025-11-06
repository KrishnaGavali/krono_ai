import { Router } from "express";
import { googleCallback, googleLogin } from "../../controllers/googleAuth.ts";

const googleAuthRouter = Router();

googleAuthRouter.get("/google", googleLogin);
googleAuthRouter.get("/google/callback", googleCallback);

export default googleAuthRouter;
