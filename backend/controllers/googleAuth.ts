import oAuth2Client from "../handlers/googleAuth.ts";
import { google } from "googleapis";
import { appwriteIds } from "../config/appwriteConfig.ts";
import { Query, TablesDB } from "node-appwrite";
import { appwriteClient } from "../handlers/appwrite.ts";
import type { Request, Response } from "express";
import type { UsersSchema } from "../schema/Users.ts";

export const googleLogin = async (
  req: Request,
  res: Response
): Promise<void> => {
  const authrizeUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/calendar",
    ],
  });
  res.redirect(authrizeUrl);
};

export const googleCallback = async (
  req: Request,
  res: Response
): Promise<void> => {
  const code = req.query.code as string;

  if (req.query.error == "access_denied") {
    res.status(403).json({ error: "Access denied by user" });
    return;
  }

  if (!code) {
    res.status(400).json({ error: "Authorization code not provided" });
    return;
  }

  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
      auth: oAuth2Client,
      version: "v2",
    });

    const userInfoResponse = await oauth2.userinfo.get();
    const userInfo = userInfoResponse.data;

    const databases = new TablesDB(appwriteClient);

    // Check if user already exists
    const existingUser = await databases.listRows({
      databaseId: appwriteIds.databaseId,
      tableId: appwriteIds.userstableId,
      queries: [Query.equal("email", userInfo.email || "")],
    });

    if (existingUser.total != 0 && existingUser.rows[0]) {
      res.redirect(
        "http://localhost:3000/dashboard?userId=" + existingUser.rows[0].$id
      );
    }

    const userdata: UsersSchema = {
      userId: userInfo.id || "",
      name: userInfo.name || "",
      email: userInfo.email || "",
      profile_url: userInfo.picture || "",
      access_token: tokens.access_token || "",
      refresh_token: tokens.refresh_token || "",
    };

    // Create new user
    const userRes = await databases.createRow({
      databaseId: appwriteIds.databaseId,
      tableId: appwriteIds.userstableId,
      rowId: userInfo.id || "",
      data: userdata,
    });

    res.redirect("http://localhost:3000/dashboard?userId=" + userRes.$id);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};
