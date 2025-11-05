import dotenv from "dotenv";

dotenv.config();

interface Config {
  port: number;
  env: string;
}

const serverConfig: Config = {
  port: Number(process.env.PORT) || 3000,
  env: process.env.NODE_ENV || "DEV",
};

export default serverConfig;
