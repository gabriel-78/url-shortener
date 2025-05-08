import { z } from 'zod';

export const deleteLinkParamsSchema = z.object({
  id: z.string().uuid('ID inválido'),
});

export type DeleteLinkParams = z.infer<typeof deleteLinkParamsSchema>;
