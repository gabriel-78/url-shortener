import { db } from '@/db';
import { linksTable } from '@/db/schemas/links';

export function getAllLinks() {
  return db.select().from(linksTable);
}
