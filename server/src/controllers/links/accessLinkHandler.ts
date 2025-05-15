import { isRight, unwrapEither } from '@/infra/shared/either';
import { failure, success } from '@/infra/shared/result';
import { accessLink } from '@/services/links/links';
import { AccessLinkParams } from '@/services/links/schemas/accessLink';
import { FastifyReply, FastifyRequest } from 'fastify';
import { toGetLinkResponse } from './utils/toGetLinkResponse';

export async function accessLinkHandler(
  request: FastifyRequest<{ Params: AccessLinkParams }>,
  reply: FastifyReply,
) {
  const { id } = request.params;

  const result = await accessLink(id);

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
