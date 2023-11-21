import { app } from './app';
import { config } from './config';
import { initializeRoutes } from './infra/initialize-routes';

class Server {
  static async start() {
    initializeRoutes();

    app.listen(config.port, '0.0.0.0', () => {
      console.log(`Server running on port ${config.port}`);
    });
  }
}

Server.start();
