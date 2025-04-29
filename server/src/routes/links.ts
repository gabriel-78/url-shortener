import { getLinksHandler } from '@/controllers/links';
import { FastifyInstance } from 'fastify';

export function linkRoutes(server: FastifyInstance) {
  server.get('/links', getLinksHandler);
}
