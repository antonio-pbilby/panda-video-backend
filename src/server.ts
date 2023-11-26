import 'reflect-metadata';
import cors from 'cors';
import { json } from 'express';

import { config } from '@/config';

import { app } from './app';
import { initializeContainer } from './infra/initialize-container';
import { initializeMongoDB } from './infra/initialize-mongodb';
import { initializeRoutes } from './infra/initialize-routes';
import { errorHandler } from './middlewares/error-handler.middleware';

class Server {
  static async start() {
    app.use(cors());
    await initializeMongoDB();
    initializeContainer();
    app.use(json());

    initializeRoutes();
    app.use(errorHandler);

    app.listen(config.app.port, '0.0.0.0', () => {
      console.log(`Server running on port ${config.app.port}`);
    });
  }
}

Server.start();
