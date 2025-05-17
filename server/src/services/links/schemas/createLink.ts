import { z } from 'zod';

export const createLinkBodySchema = z.object({
  originalUrl: z.string(),
  shortenerUrl: z.string(),
});

export type CreateLinkBody = z.infer<typeof createLinkBodySchema>;
