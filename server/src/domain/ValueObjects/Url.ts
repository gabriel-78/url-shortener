import { AppError } from '@/functions/errors/appError';
import { Either, makeLeft, makeRight } from '@/infra/shared/either';
import { URL } from 'url';

export class Url {
  private constructor(private readonly value: string) {}

  static create(raw: string): Either<AppError, Url> {
    try {
      const url = new URL(raw);

      if (!['http:', 'https:'].includes(url.protocol)) {
        return makeLeft(new AppError('DOMAIN_ERROR', 'Invalid protocol'));
      }

      if (!url.hostname) {
        return makeLeft(new AppError('DOMAIN_ERROR', 'Invalid hostname'));
      }

      return makeRight(new Url(url.toString()));
    } catch {
      return makeLeft(new AppError('DOMAIN_ERROR', 'Malformed URL'));
    }
  }

  public getValue(): string {
    return this.value;
  }
}
