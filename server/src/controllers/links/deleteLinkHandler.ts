import { isRight, unwrapEither } from '@/infra/shared/either';
import { failure, success } from '@/infra/shared/result';
import { deleteLink } from '@/services/links/links';
import { DeleteLinkParams } from '@/services/links/schemas/deleteLink';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function deleteLinkHandler(
  request: FastifyRequest<{ Params: DeleteLinkParams }>,
  reply: FastifyReply,
) {
  const { id } = request.params;

  const result = await deleteLink(id);

  if (isRight(result)) {
    return reply.status(200).send(success(null));
  }

  const error = unwrapEither(result);

  const statusCode = error.getStatusCode();

  if (statusCode === 500) return reply.status(500).send();

  return reply.status(statusCode).send(failure(error.message));
}
