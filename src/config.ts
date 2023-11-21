import 'dotenv/config';

export const config = {
  port: Number(process.env.APP_PORT) || 3030,
};
