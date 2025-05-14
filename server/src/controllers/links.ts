import { isRight, unwrapEither } from '@/infra/shared/either';
import { accessLink, createLink, deleteLink } from '@/services/links/links';
import { AccessLinkParams } from '@/services/links/schemas/accessLink';
import { CreateLinkBody } from '@/services/links/schemas/createLink';
import { DeleteLinkParams } from '@/services/links/schemas/deleteLink';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function deleteLinkHandler(
  request: FastifyRequest<{ Params: DeleteLinkParams }>,
  reply: FastifyReply,
) {
  const { id } = request.params;

  const result = await deleteLink(id);

  if (isRight(result)) {
    const links = unwrapEither(result);

    return reply.status(200).send(links);
  }

  const error = unwrapEither(result);

  const statusCode = error.getStatusCode();

  if (statusCode === 500) return reply.status(500).send();

  return reply.status(statusCode).send({ message: error.message });
}

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
    const links = unwrapEither(result);

    return reply.status(200).send(links);
  }

  const error = unwrapEither(result);

  const statusCode = error.getStatusCode();

  if (statusCode === 500) return reply.status(500).send();

  return reply.status(statusCode).send({ message: error.message });
}

export async function accessLinkHandler(
  request: FastifyRequest<{ Params: AccessLinkParams }>,
  reply: FastifyReply,
) {
  const { id } = request.params;

  const result = await accessLink(id);

  if (isRight(result)) {
    const links = unwrapEither(result);

    return reply.status(200).send(links);
  }

  const error = unwrapEither(result);

  const statusCode = error.getStatusCode();

  if (statusCode === 500) return reply.status(500).send();

  return reply.status(statusCode).send({ message: error.message });
}
