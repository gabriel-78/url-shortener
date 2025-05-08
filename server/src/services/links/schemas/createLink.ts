import { z } from 'zod';

export const createLinkBodySchema = z.object({
  originalUrl: z.string().url('Invalid URL'),
  shortenerUrl: z.string().min(1, 'Invalid abreviation'),
});

export type CreateLinkBody = z.infer<typeof createLinkBodySchema>;
