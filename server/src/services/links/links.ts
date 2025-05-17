import { db } from '@/db';
import { linksTable } from '@/db/schemas/links';
import { LinkEntity } from '@/domain/link/entity';
import { AppError } from '@/functions/errors/appError';
import { Either, isLeft, makeLeft, makeRight, unwrapEither } from '@/infra/shared/either';
import { eq, InferSelectModel } from 'drizzle-orm';

type Link = InferSelectModel<typeof linksTable>;

export async function getAllLinks(): Promise<Either<AppError, LinkEntity[]>> {
  try {
    const links = await db.select().from(linksTable);

    const entities = links.reduce<LinkEntity[]>((acc, value) => {
      const link = LinkEntity.create({
        originalUrl: value.originalUrl,
        shortenerUrl: value.shortenerlUrl,
        accessQuantity: value.accessQuantity,
        createdAt: value.createdAt,
        id: value.id,
        updatedAt: value.updatedAt,
      });

      return isLeft(link) ? acc : [...acc, unwrapEither(link)];
    }, [] as LinkEntity[]);

    return makeRight(entities);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);

    return makeLeft(new AppError('DB_ERROR', 'Erro ao buscar links no banco de dados', message));
  }
}

export async function getLink(id: string): Promise<Either<AppError, LinkEntity>> {
  try {
    const [link] = await db.select().from(linksTable).where(eq(linksTable.id, id));

    if (!link) return makeLeft(new AppError('NOT_FOUND', 'Link not exist'));

    const entity = LinkEntity.create({
      originalUrl: link.originalUrl,
      shortenerUrl: link.shortenerlUrl,
      accessQuantity: link.accessQuantity,
      createdAt: link.createdAt,
      id: link.id,
      updatedAt: link.updatedAt,
    });

    return entity;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);

    return makeLeft(new AppError('DB_ERROR', 'Error to search link', message));
  }
}

export async function updateLink(value: LinkEntity): Promise<Either<AppError, LinkEntity>> {
  const [link] = await db
    .update(linksTable)
    .set({
      accessQuantity: value.accessQuantity,
      createdAt: value.createdAt,
      originalUrl: value.originalUrl.getValue(),
      shortenerlUrl: value.shortenerUrl.getValue(),
      updatedAt: value.updatedAt,
    })
    .where(eq(linksTable.id, value.id))
    .returning();

  if (!link)
    return makeLeft(new AppError('DB_ERROR', 'Error in update access link from the database'));

  if (link instanceof Error)
    return makeLeft(
      new AppError('DB_ERROR', 'Error in update access link from the database', link.message),
    );

  return makeRight(value);
}

export async function deleteLink(id: string): Promise<Either<AppError, null>> {
  const links = await db.delete(linksTable).where(eq(linksTable.id, id));

  if (!links) return makeLeft(new AppError('DB_ERROR', 'Error delete link from the database'));

  if (links instanceof Error)
    return makeLeft(new AppError('DB_ERROR', 'Error delete link from the database', links.message));

  return makeRight(null);
}

export async function createLink(value: LinkEntity): Promise<Either<AppError, LinkEntity>> {
  const newLink: Omit<Link, 'id'> = {
    accessQuantity: 0,
    createdAt: new Date(),
    originalUrl: value.originalUrl.getValue(),
    shortenerlUrl: value.shortenerUrl.getValue(),
    updatedAt: null,
  };

  const [link] = await db
    .select()
    .from(linksTable)
    .where(eq(linksTable.shortenerlUrl, newLink.shortenerlUrl));

  if (link)
    return makeLeft(new AppError('DOMAIN_ERROR', 'Already exist a link with this abreviation'));

  const [createdLink] = await db.insert(linksTable).values(newLink).returning();

  if (!createdLink) return makeLeft(new AppError('DB_ERROR', 'Error to create link'));

  if (createdLink instanceof Error)
    return makeLeft(new AppError('DB_ERROR', 'Error to create link', createdLink.message));

  return LinkEntity.create({
    originalUrl: createdLink.originalUrl,
    id: createdLink.id,
    shortenerUrl: createdLink.shortenerlUrl,
    accessQuantity: createdLink.accessQuantity,
    createdAt: createdLink.createdAt,
    updatedAt: createdLink.updatedAt,
  });
}
