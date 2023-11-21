export class HttpError extends Error {
  public statusCode: number;

  constructor(message?: string, statusCode?: number) {
    super();
    this.name = 'ServerError';
    this.message = message ?? 'Server failed. Try again soon';
    this.statusCode = statusCode ?? 500;
  }
}
