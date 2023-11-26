import { injectable } from 'inversify';
import { sign as jwtSign, verify as jwtVerify } from 'jsonwebtoken';

import { config } from '@/config';

import { Token } from './token.namespace';

@injectable()
export class TokenProvider implements Token.ProviderInterface {
  sign(payload: Record<string, any>): string {
    return jwtSign(payload, config.app.secret, {
      expiresIn: config.app.tokenExpiresIn,
    });
  }

  verify<T>(token: string): T {
    return jwtVerify(token, config.app.secret) as T;
  }
}
