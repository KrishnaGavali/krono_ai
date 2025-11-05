import type { Request, Response } from "express";

export const googleLogin = async (
  req: Request,
  res: Response
): Promise<void> => {
  res.redirect("http://localhost:3001");
};
