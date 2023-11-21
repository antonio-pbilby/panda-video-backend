import { HttpError } from './http.error';

export class AuthenticationError extends HttpError {
  constructor(message: string) {
    super();
    this.name = 'AuthenticationError';
    this.message = message;
    this.statusCode = 401;
  }
}
