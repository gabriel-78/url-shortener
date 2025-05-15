import { db } from '@/db';
import { linksTable } from '@/db/schemas/links';
import { LinkEntity } from '@/domain/link/entity';
import { AppError } from '@/functions/errors/appError';
import { Either, makeLeft, makeRight } from '@/infra/shared/either';
import { eq, InferSelectModel, sql } from 'drizzle-orm';

type Link = InferSelectModel<typeof linksTable>;

export async function getAllLinks(): Promise<Either<AppError, LinkEntity[]>> {
  try {
    const links = await db.select().from(linksTable);

    const entities = links.map<LinkEntity>((link) => new LinkEntity(link));

    return makeRight(entities);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);

    return makeLeft(new AppError('DB_ERROR', 'Erro ao buscar links no banco de dados', message));
  }
}

export async function accessLink(id: string): Promise<Either<AppError, LinkEntity>> {
  const [link] = await db
    .update(linksTable)
    .set({ accessQuantity: sql`${linksTable.accessQuantity} + 1`, updatedAt: new Date() })
    .where(eq(linksTable.id, id))
    .returning();

  if (!link)
    return makeLeft(new AppError('DB_ERROR', 'Error in update access link from the database'));

  if (link instanceof Error)
    return makeLeft(
      new AppError('DB_ERROR', 'Error in update access link from the database', link.message),
    );

  const entity = new LinkEntity(link);

  return makeRight(entity);
}

export async function deleteLink(id: string): Promise<Either<AppError, null>> {
  const links = await db.delete(linksTable).where(eq(linksTable.id, id));

  if (!links) return makeLeft(new AppError('DB_ERROR', 'Error delete link from the database'));

  if (links instanceof Error)
    return makeLeft(new AppError('DB_ERROR', 'Error delete link from the database', links.message));

  return makeRight(null);
}

export async function createLink(value: {
  originalUrl: string;
  shortenerUrl: string;
}): Promise<Either<AppError, LinkEntity>> {
  const newLink: Omit<Link, 'id'> = {
    accessQuantity: 0,
    createdAt: new Date(),
    originalUrl: value.originalUrl,
    shortenerlUrl: value.shortenerUrl,
    updatedAt: null,
  };

  const [link] = await db.insert(linksTable).values(newLink).returning();

  if (!link) return makeLeft(new AppError('DB_ERROR', 'Error delete link from the database'));

  if (link instanceof Error)
    return makeLeft(new AppError('DB_ERROR', 'Error delete link from the database', link.message));

  const entity = new LinkEntity(link);

  return makeRight(entity);
}
