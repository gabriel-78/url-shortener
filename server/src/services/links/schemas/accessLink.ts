import { z } from 'zod';

export const accessLinkParamsSchema = z.object({
  id: z.string().uuid('ID inválido'),
});

export type AccessLinkParams = z.infer<typeof accessLinkParamsSchema>;
