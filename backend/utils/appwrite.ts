import { Query, TablesDB } from "node-appwrite";
import { appwriteClient } from "../handlers/appwrite.ts";
import { appwriteIds } from "../config/appwriteConfig.ts";

const getUserAccessToken = async (
  userId: string
): Promise<{ accessToken: string; refreshToken: string | null } | null> => {
  const database = new TablesDB(appwriteClient);

  const userData = await database.getRow({
    databaseId: appwriteIds.databaseId,
    tableId: appwriteIds.userstableId,
    rowId: userId,
    queries: [Query.select(["access_token", "refresh_token"])],
  });

  console.log("Retrieved user data:", userData);

  if (!userData.access_token) {
    return null;
  }

  return {
    accessToken: userData.access_token,
    refreshToken: userData.refresh_token || null,
  };
};

export { getUserAccessToken };
