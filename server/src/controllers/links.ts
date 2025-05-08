import { isRight, unwrapEither } from '@/infra/shared/either';
import { deleteLink, getAllLinks } from '@/services/links/links';
import { DeleteLinkParams } from '@/services/links/schemas/deleteLink';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function getLinksHandler(request: FastifyRequest, reply: FastifyReply) {
  const result = await getAllLinks();

  if (isRight(result)) {
    const links = unwrapEither(result);

    return reply.status(200).send(links);
  }

  const error = unwrapEither(result);

  const statusCode = error.getStatusCode();

  if (statusCode === 500) return reply.status(500).send();

  return reply.status(statusCode).send({ message: error.message });
}

export async function deleteLinkHandler(
  request: FastifyRequest<{ Params: DeleteLinkParams }>,
  reply: FastifyReply,
) {
  const { id } = request.params;

  const result = await deleteLink(id);

  console.log('result', result);

  if (isRight(result)) {
    const links = unwrapEither(result);

    return reply.status(200).send(links);
  }

  const error = unwrapEither(result);

  const statusCode = error.getStatusCode();

  if (statusCode === 500) return reply.status(500).send();

  return reply.status(statusCode).send({ message: error.message });
}
