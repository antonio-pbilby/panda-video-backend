import { HttpError } from './http.error';

export class UnauthorizedError extends HttpError {
  constructor(message?: string) {
    super();
    this.name = 'UnauthorizedError';
    this.message = message || 'Unauthorized';
    this.statusCode = 401;
  }
}
