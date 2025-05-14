import { z } from 'zod';

export const getLinkResponseSchema = z.object({
  id: z.string(),
  url: z.string(),
  abreviatedUrl: z.string(),
  accessQuantity: z.coerce.number(),
});

export type GetLinkResponse = z.infer<typeof getLinkResponseSchema>;
