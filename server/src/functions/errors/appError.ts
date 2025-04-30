export class AppError extends Error {
  constructor(
    public code: 'DB_ERROR' | 'NOT_FOUND' | 'VALIDATION_ERROR' | 'UNEXPECTED',
    public message: string,
    public details?: unknown,
  ) {
    super(message);
    this.name = 'AppError';
  }

  getStatusCode(): number {
    switch (this.code) {
      case 'NOT_FOUND':
        return 404;
      case 'VALIDATION_ERROR':
        return 422;
      case 'DB_ERROR':
        return 500;
      case 'UNEXPECTED':
      default:
        return 400;
    }
  }
}
