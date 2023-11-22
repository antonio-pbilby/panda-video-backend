import { NextFunction, Request, Response } from 'express';

export class VideosController {
  constructor() {}

  list(req: Request, res: Response, next: NextFunction) {
    try {
      res.json('ok');
    } catch (err) {
      next(err);
    }
  }
}
