import { NextFunction, Request, Response } from 'express';

import { IDENTIFIERS, container } from '@/container';

import { User } from './ users.namespace';

export class UsersController {
  private readonly usersService: User.ServiceInterface;
  constructor() {
    this.usersService = container.get<User.ServiceInterface>(
      IDENTIFIERS.USERS_SERVICE,
    );
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.usersService.create(req.body);
      return res.status(201).json(result);
    } catch (err) {
      return next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.usersService.login(req.body);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
}
