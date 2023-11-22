import { NextFunction, Request, Response } from 'express';

import { VideosService } from './videos.service';

export class VideosController {
  private readonly videosService = new VideosService();

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.videosService.list(req.query);
      return res.json(result);
    } catch (err) {
      next(err);
    }
  }
}
