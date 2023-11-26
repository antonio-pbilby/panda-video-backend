import { app } from '@/app';
import { validateSchema } from '@/middlewares/validate-schema.middleware';
import { User } from '@/modules/users/ users.namespace';
import { UsersController } from '@/modules/users/users.controller';
import { VideosController } from '@/modules/videos/videos.controller';
import { Videos } from '@/modules/videos/videos.namespace';

export function initializeRoutes() {
  const usersController = new UsersController();
  const videosController = new VideosController();

  app.post(
    '/signup',
    validateSchema(User.signupSchema),
    usersController.createUser.bind(usersController),
  );

  app.post(
    '/login',
    validateSchema(User.loginSchema),
    usersController.login.bind(usersController),
  );

  app.get(
    '/videos',
    validateSchema(Videos.listParamsSchema),
    videosController.list.bind(videosController),
  );
}
