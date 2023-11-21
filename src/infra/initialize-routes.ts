import { app } from '@/app';
import { UsersController } from '@/modules/users/users.controller';

export function initializeRoutes() {
  const usersController = new UsersController();

  app.post('/users', usersController.createUser.bind(usersController));

  app.post('/login', usersController.login.bind(usersController));
}
