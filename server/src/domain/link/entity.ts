import { ShortenerUrl } from '../ValueObjects/ShortenerUrl';
import { Url } from '../ValueObjects/url';
import { Either, isLeft, makeRight, unwrapEither } from '@/infra/shared/either';
import { AppError } from '@/functions/errors/appError';

export class LinkEntity {
  public readonly id: string;
  public readonly originalUrl: Url;
  public readonly shortenerUrl: ShortenerUrl;
  public readonly accessQuantity: number;
  public readonly createdAt: Date;
  public readonly updatedAt: Date | null;

  private constructor(props: {
    id: string;
    originalUrl: Url;
    shortenerUrl: ShortenerUrl;
    accessQuantity: number;
    createdAt: Date;
    updatedAt: Date | null;
  }) {
    this.id = props.id;
    this.originalUrl = props.originalUrl;
    this.shortenerUrl = props.shortenerUrl;
    this.accessQuantity = props.accessQuantity;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  public static create(props: {
    id?: string;
    originalUrl: string;
    shortenerUrl: string;
    accessQuantity?: number;
    createdAt?: Date;
    updatedAt?: Date | null;
  }): Either<AppError, LinkEntity> {
    const originalUrlEither = Url.create(props.originalUrl);
    if (isLeft(originalUrlEither)) return originalUrlEither;

    const shortenerUrlEither = ShortenerUrl.create(props.shortenerUrl);
    if (isLeft(shortenerUrlEither)) return shortenerUrlEither;

    return makeRight(
      new LinkEntity({
        id: props.id ?? '',
        originalUrl: unwrapEither(originalUrlEither),
        shortenerUrl: unwrapEither(shortenerUrlEither),
        accessQuantity: props.accessQuantity ?? 0,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? null,
      }),
    );
  }

  public incrementAccess(): LinkEntity {
    return new LinkEntity({
      ...this,
      accessQuantity: this.accessQuantity + 1,
      updatedAt: new Date(),
    });
  }
}
