import { isRight, unwrapEither } from '@/infra/shared/either';
import { failure, success } from '@/infra/shared/result';
import { getAllLinks } from '@/services/links/links';
import { GetLinkResponse, getLinkResponseSchema } from '@/services/links/schemas/responses/getLink';
import { FastifyReply, FastifyRequest } from 'fastify';
import { toGetLinkResponse } from './utils/toGetLinkResponse';

export async function getLinksHandler(request: FastifyRequest, reply: FastifyReply) {
  const result = await getAllLinks();

  if (isRight(result)) {
    const links = unwrapEither(result);

    const x = links.map((y) => getLinkResponseSchema.parse(y));

    return reply.status(200).send(success(x));
  }

  const error = unwrapEither(result);

  const statusCode = error.getStatusCode();

  if (statusCode === 500) return reply.status(500).send();

  return reply.status(statusCode).send(failure(error.message));
}
