import { HttpError } from './http.error';

export class BadRequestError extends HttpError {
  constructor(message?: string) {
    super();
    this.name = 'BadRequestError';
    this.message = message || 'Malformed Request';
    this.statusCode = 400;
  }
}
