import { NextFunction, Request, Response } from 'express';
import { Schema } from 'yup';

import { ValidationError } from '@/errors/validation.error';

interface RequestObject {
  body?: any;
  params?: any;
  query?: any;
}

export const validateSchema =
  (schema: Schema<RequestObject>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reqQueryKeys = Object.keys(req.query || {});
      const schemaKeys = Object.keys(
        (schema as any)?.fields?.query?.fields || {},
      );
      reqQueryKeys.forEach((key) => {
        if (!schemaKeys.includes(key)) {
          return next(
            new ValidationError([
              `The field ${key} doesn't exist. Please check the spelling.`,
            ]),
          );
        }
      });

      await schema.validate(
        {
          body: req.body,
          query: req.query,
          params: req.params,
        },
        {
          abortEarly: false,
        },
      );
      return next();
    } catch (err: any) {
      return next(new ValidationError(err.errors));
    }
  };
