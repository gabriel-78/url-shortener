import { isRight, unwrapEither } from '@/infra/shared/either';
import { getAllLinks } from '@/services/links';
import { FastifyReply, FastifyRequest } from 'fastify';

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
