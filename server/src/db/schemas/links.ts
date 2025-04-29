import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { uuidv7 } from 'uuidv7';

export const linksTable = pgTable('links', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  originalUrl: text('original_url').notNull(),
  shortenerlUrl: text('shortener_url').notNull(),
  accessQuantity: integer('access_quantity').notNull(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at'),
});
