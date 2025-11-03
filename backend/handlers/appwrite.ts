import { Client } from "node-appwrite";

const client = new Client();

client
  .setEndpoint(process.env.APPWRITE_ENDPOINT as string) // Your API Endpoint
  .setProject(process.env.APPWRITE_PROJECT_ID as string) // Your project ID
  .setKey(process.env.APPWRITE_API_KEY as string); // Your secret API key
