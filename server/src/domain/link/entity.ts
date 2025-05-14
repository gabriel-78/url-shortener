import type { Link } from '@/db/schemas/links';

export class LinkEntity {
  public readonly id: string;
  public readonly originalUrl: string;
  public readonly shortenerUrl: string;
  public readonly accessQuantity: number;
  public readonly createdAt: Date;
  public readonly updatedAt: Date | null;

  constructor(props: Link) {
    this.id = props.id;
    this.originalUrl = props.originalUrl;
    this.shortenerUrl = props.shortenerlUrl;
    this.accessQuantity = props.accessQuantity ?? 0;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? null;
  }
}
