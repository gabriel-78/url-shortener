import { env } from '@/env';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { schemas } from './schemas';

const pg = postgres(env.DATABASE_URL);
export const db = drizzle(pg, { schema: schemas });
