import {
  accessLinkHandler,
  createLinkHandler,
  deleteLinkHandler,
  getLinksHandler,
} from '@/controllers/links';
import { accessLinkParamsSchema } from '@/services/links/schemas/accessLink';
import { createLinkBodySchema } from '@/services/links/schemas/createLink';
import { deleteLinkParamsSchema } from '@/services/links/schemas/deleteLink';
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';

export const linkRoutes: FastifyPluginAsyncZod = async (server) => {
  server.get('/links', getLinksHandler);

  server.post('/links', { schema: { body: createLinkBodySchema } }, createLinkHandler);

  server.delete(
    '/links/:id',
    {
      schema: { params: deleteLinkParamsSchema },
    },
    deleteLinkHandler,
  );

  server.post(
    '/links/:id/access',
    {
      schema: { params: accessLinkParamsSchema },
    },
    accessLinkHandler,
  );
};
