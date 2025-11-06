import { Client } from "node-appwrite";
import appwriteConfig from "../config/appwriteConfig.ts";

let appwriteClient = new Client()
  .setEndpoint(appwriteConfig.endpoint) // Your API Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID
  .setKey(appwriteConfig.apiKey); // Your secret API key

export { appwriteClient };
