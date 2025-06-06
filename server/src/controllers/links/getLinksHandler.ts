import { isRight, unwrapEither } from '@/infra/shared/either';
import { failure, success } from '@/infra/shared/result';
import { getAllLinks } from '@/services/links/links';
import { FastifyReply, FastifyRequest } from 'fastify';
import { toGetLinkResponse } from './utils/toGetLinkResponse';

export async function getLinksHandler(request: FastifyRequest, reply: FastifyReply) {
  const result = await getAllLinks();

  if (isRight(result)) {
    const links = unwrapEither(result);

    const response = links.map((link) => toGetLinkResponse(link));

    return reply.status(200).send(success(response));
  }

  const error = unwrapEither(result);

  const statusCode = error.getStatusCode();

  if (statusCode === 500) return reply.status(500).send();

  return reply.status(statusCode).send(failure(error.message));
}
