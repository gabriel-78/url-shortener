import { accessLinkHandler, createLinkHandler, deleteLinkHandler } from '@/controllers/links';
import { getLinksHandler } from '@/controllers/links/getLinksHandler';
import { failure, success } from '@/infra/shared/result';
import { accessLinkParamsSchema } from '@/services/links/schemas/accessLink';
import { createLinkBodySchema } from '@/services/links/schemas/createLink';
import { deleteLinkParamsSchema } from '@/services/links/schemas/deleteLink';
import { getLinkResponseSchema } from '@/services/links/schemas/responses/getLink';
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';

export const linkRoutes: FastifyPluginAsyncZod = async (server) => {
  server.get(
    '/links',
    // { schema: { response: { 200: success(z.array(getLinkResponseSchema)) } } },
    getLinksHandler,
  );

  server.post(
    '/links',
    // {
    //   schema: {
    //     body: createLinkBodySchema,
    //     response: { 200: success(getLinkResponseSchema), 400: failure },
    //   },
    // },
    createLinkHandler,
  );

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
