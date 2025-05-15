import { isRight, unwrapEither } from '@/infra/shared/either';
import { failure, success } from '@/infra/shared/result';
import { createLink } from '@/services/links/links';
import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateLinkBody } from '@/services/links/schemas/createLink';
import { toGetLinkResponse } from './utils/toGetLinkResponse';

export async function createLinkHandler(
  request: FastifyRequest<{ Body: CreateLinkBody }>,
  reply: FastifyReply,
) {
  const value = request.body;

  const result = await createLink({
    originalUrl: value.originalUrl,
    shortenerUrl: value.shortenerUrl,
  });

  if (isRight(result)) {
    const link = unwrapEither(result);

    const response = toGetLinkResponse(link);
    return reply.status(200).send(success(response));
  }

  const error = unwrapEither(result);

  const statusCode = error.getStatusCode();

  if (statusCode === 500) return reply.status(500).send();

  return reply.status(statusCode).send(failure(error.message));
}
