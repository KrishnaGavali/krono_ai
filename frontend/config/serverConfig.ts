type serverConfigType = {
  env: string;
};

export const serverConfig: serverConfigType = {
  env: (process.env.NEXT_PUBLIC_ENV ?? "DEV") as string,
};
