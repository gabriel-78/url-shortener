import { deleteLinkHandler, getLinksHandler } from '@/controllers/links';
import { deleteLinkParamsSchema } from '@/services/links/schemas/deleteLink';
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';

export const linkRoutes: FastifyPluginAsyncZod = async (server) => {
  server.get('/links', getLinksHandler);

  server.delete(
    '/links/:id',
    {
      schema: { params: deleteLinkParamsSchema },
    },
    deleteLinkHandler,
  );
};
