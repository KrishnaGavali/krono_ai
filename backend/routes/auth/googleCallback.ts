import { Router } from "express";
import { googleLogin } from "../../controllers/googleAuth.ts";

const googleAuthRouter = Router();

googleAuthRouter.get("/google", googleLogin);

export default googleAuthRouter;
