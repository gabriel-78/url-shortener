import { getAllLinks } from '@/services/links';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function getLinksHandler(request: FastifyRequest, reply: FastifyReply) {
  const links = await getAllLinks();

  return reply.status(200).send(links);
}
