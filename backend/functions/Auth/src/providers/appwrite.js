import { Client } from 'node-appwrite';

const getClient = () => {
  const client = new Client();

  client
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  return client;
};

export { getClient };
