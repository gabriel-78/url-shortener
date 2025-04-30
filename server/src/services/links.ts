import { db } from '@/db';
import { linksTable } from '@/db/schemas/links';
import { AppError } from '@/functions/errors/appError';
import { Either, makeLeft, makeRight } from '@/infra/shared/either';
import { InferSelectModel } from 'drizzle-orm';

type Link = InferSelectModel<typeof linksTable>;

export async function getAllLinks(): Promise<Either<AppError, Link[]>> {
  const links = await db.select().from(linksTable);

  if (!links) return makeLeft(new AppError('DB_ERROR', 'Error fetching links from the database'));

  if (links instanceof Error)
    return makeLeft(
      new AppError('DB_ERROR', 'Error fetching links from the database', links.message),
    );

  return makeRight(links);
}
