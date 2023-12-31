import 'dotenv/config';

export const config = {
  pandaVideo: {
    apiUrl: process.env.PANDA_VIDEO_API_URL,
    apiKey: process.env.PANDA_VIDEO_API_KEY,
    cdnUrl: process.env.PANDA_VIDEO_CDN_URL,
    cdnReferer: process.env.PANDA_VIDEO_CDN_REFERER,
  },
  app: {
    port: Number(process.env.APP_PORT) || 3030,
    mongo: process.env.MONGO_CONNECTION_STRING!,
    secret: process.env.APP_SECRET!,
    tokenExpiresIn: process.env.EXPIRES_IN || '7d',
    baseUrl: process.env.BASE_URL,
  },
};
