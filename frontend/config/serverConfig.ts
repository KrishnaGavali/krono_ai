type serverConfigType = {
  env: string;
};

export const serverConfig: serverConfigType = {
  env: import.meta.env.VITE_ENV as string,
};
