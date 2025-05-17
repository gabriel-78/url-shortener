import { AppError } from '@/functions/errors/appError';
import { Either, makeLeft, makeRight } from '@/infra/shared/either';

export class ShortenerUrl {
  private constructor(private readonly value: string) {}

  static create(raw: string): Either<AppError, ShortenerUrl> {
    if (raw.length === 0)
      return makeLeft(new AppError('DOMAIN_ERROR', `Shortener url can't be empty`));

    if (!/^[a-zA-Z0-9_-]+$/.test(raw)) {
      return makeLeft(
        new AppError(
          'DOMAIN_ERROR',
          `Shortener url should only contains letters, numbers, dash or underscore`,
        ),
      );
    }

    return makeRight(new ShortenerUrl(raw));
  }

  public getValue(): string {
    return this.value;
  }
}
