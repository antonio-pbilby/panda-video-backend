import { NextFunction, Request, Response } from 'express';

import { HttpError } from '@/errors/http.error';

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  console.log(error);
  if (error instanceof HttpError) {
    res.status(error.statusCode).json({ error });

    return next();
  }

  res.status(500).json('Internal Server Error');

  return next();
}
