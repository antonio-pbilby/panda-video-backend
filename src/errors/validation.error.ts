import { HttpError } from './http.error';

export class ValidationError extends HttpError {
  constructor(messages?: string[]) {
    super();
    this.name = 'ValidationError';
    this.message =
      messages?.join('. ') || 'Something went wrong during validation';
    this.statusCode = 400;
  }
}
