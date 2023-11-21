import 'dotenv/config';

export const config = {
  port: Number(process.env.APP_PORT) || 3030,
  mongo: process.env.MONGO_CONNECTION_STRING!,
  appSecret: process.env.APP_SECRET!,
  tokenExpiresIn: process.env.EXPIRES_IN || '7d',
};
