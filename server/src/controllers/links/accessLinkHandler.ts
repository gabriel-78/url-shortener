import { isLeft, isRight, unwrapEither } from '@/infra/shared/either';
import { failure, success } from '@/infra/shared/result';
import { getLink, updateLink } from '@/services/links/links';
import { AccessLinkParams } from '@/services/links/schemas/accessLink';
import { FastifyReply, FastifyRequest } from 'fastify';
import { toGetLinkResponse } from './utils/toGetLinkResponse';

export async function accessLinkHandler(
  request: FastifyRequest<{ Params: AccessLinkParams }>,
  reply: FastifyReply,
) {
  const { id } = request.params;

  const linkEither = await getLink(id);

  if (isLeft(linkEither)) return linkEither;

  let link = unwrapEither(linkEither);

  link = link.incrementAccess();

  const result = await updateLink(link);

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
