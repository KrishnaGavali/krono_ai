interface AppwriteConfig {
  endpoint: string;
  projectId: string;
  apiKey: string;
}

interface AppwriteIds {
  databaseId: string;
  userstableId: string;
}

const appwriteConfig: AppwriteConfig = {
  endpoint: process.env.APPWRITE_ENDPOINT || "http://localhost/v1",
  projectId: process.env.APPWRITE_PROJECT_ID || "",
  apiKey: process.env.APPWRITE_API_KEY || "",
};

const appwriteIds: AppwriteIds = {
  databaseId: process.env.APPWRITE_DATABASE_ID || "kronoai_db",
  userstableId: process.env.APPWRITE_USERS_TABLE_ID || "kronoai_users",
};

export { appwriteIds };

export default appwriteConfig;
