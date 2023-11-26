import { NextFunction, Request, Response } from 'express';
import { request } from 'http';

import { IDENTIFIERS, container } from '@/container';
import { UnauthorizedError } from '@/errors/unauthorized.error';
import { Token } from '@/modules/tokens/token.namespace';
import { User } from '@/modules/users/ users.namespace';

export const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedError();
  }

  const [_, token] = authHeader.split(' ');

  const tokenProvider = container.get<Token.ProviderInterface>(
    IDENTIFIERS.TOKEN_PROVIDER,
  );

  try {
    const { email, name } = tokenProvider.verify<User.TokenData>(token);

    Object.assign(request, {
      user: {
        email,
        name,
      },
    });

    return next();
  } catch (err) {
    throw new UnauthorizedError();
  }
};
