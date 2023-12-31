import { NextFunction, Request, Response } from 'express';

import { VideosCdnAdapter } from './video-cdn.adapter';
import { VideosService } from './videos.service';

export class VideosController {
  private readonly videosService = new VideosService();
  private readonly videosCdnAdapter = new VideosCdnAdapter();

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.videosService.list(req.query);
      return res.json(result);
    } catch (err) {
      next(err);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const params = {
        id: req.params.id,
      };
      const result = await this.videosService.get(params);
      return res.json(result);
    } catch (err) {
      next(err);
    }
  }

  async getThumbnail(req: Request, res: Response, next: NextFunction) {
    try {
      const { externalId } = req.params;
      const response = await this.videosCdnAdapter.thumbnail(externalId);
      return res.setHeader('content-type', 'image/jpg').send(response);
    } catch (err) {
      return next(err);
    }
  }

  async getPreview(req: Request, res: Response, next: NextFunction) {
    try {
      const { externalId } = req.params;
      const response = await this.videosCdnAdapter.preview(externalId);
      return res.setHeader('content-type', 'image/jpg').send(response);
    } catch (err) {
      return next(err);
    }
  }

  async getHls(req: Request, res: Response, next: NextFunction) {
    try {
      const { externalId } = req.params;
      const response = await this.videosCdnAdapter.videoHls(externalId);
      return res
        .setHeader('content-type', 'application/vnd.apple.mpegurl')
        .send(response);
    } catch (err) {
      return next(err);
    }
  }
}
