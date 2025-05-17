import { isLeft, unwrapEither } from '@/infra/shared/either';
import { failureRequest, success } from '@/infra/shared/result';
import { createLink } from '@/services/links/links';
import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateLinkBody } from '@/services/links/schemas/createLink';
import { toGetLinkResponse } from './utils/toGetLinkResponse';
import { LinkEntity } from '@/domain/link/entity';

export async function createLinkHandler(
  request: FastifyRequest<{ Body: CreateLinkBody }>,
  reply: FastifyReply,
) {
  const value = request.body;

  const linkEither = LinkEntity.create({
    originalUrl: value.originalUrl,
    shortenerUrl: value.shortenerUrl,
  });

  if (isLeft(linkEither)) {
    return failureRequest(reply, unwrapEither(linkEither));
  }

  const createdLinkEither = await createLink(unwrapEither(linkEither));

  if (isLeft(createdLinkEither)) {
    return failureRequest(reply, unwrapEither(createdLinkEither));
  }

  const createdLink = unwrapEither(createdLinkEither);

  const response = toGetLinkResponse(createdLink);

  return reply.status(201).send(success(response));
}
