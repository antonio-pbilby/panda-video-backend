import { NextFunction, Request, Response } from 'express';

import { HttpError } from '@/errors/http.error';

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (error instanceof HttpError) {
    res.status(error.statusCode).json({ error });

    return next();
  }

  console.log(error);
  res.status(500).json('Internal Server Error');

  return next();
}
