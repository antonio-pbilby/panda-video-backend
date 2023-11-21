import express from 'express';

import { config } from './config';

class Server {
  static async start() {
    const app = express();

    app.listen(config.port, '0.0.0.0', () => {
      console.log(`Server running on port ${config.port}`);
    });
  }
}

Server.start();
