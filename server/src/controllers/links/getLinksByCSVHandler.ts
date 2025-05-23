import { isLeft, unwrapEither } from '@/infra/shared/either';
import { failureRequest, success } from '@/infra/shared/result';
import { getAllLinks } from '@/services/links/links';
import { FastifyReply, FastifyRequest } from 'fastify';
import { PassThrough, Readable, Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { stringify } from 'csv-stringify';
import { uploadFileToStorage } from '@/infra/storage/uploadFileToStorage';

export async function getLinksByCSVHandler(request: FastifyRequest, reply: FastifyReply) {
  const allLinksEither = await getAllLinks();

  if (isLeft(allLinksEither)) {
    return failureRequest(reply, unwrapEither(allLinksEither));
  }

  const allLinks = unwrapEither(allLinksEither);

  const records = allLinks.map((link) => link.toObject());

  const csv = stringify({
    delimiter: ',',
    header: true,
    columns: [
      { key: 'originalUrl', header: 'Original Url' },
      { key: 'shortenerUrl', header: 'Shortener Url' },
      { key: 'accessQuantity', header: 'Access Count' },
      { key: 'createdAt', header: 'Created Date' },
    ],
  });

  const uploadStorageStream = new PassThrough();

  const convertToCSVPipeline = pipeline(
    Readable.from(records),
    new Transform({
      objectMode: true,
      transform(chunk: unknown[], encoding, callback) {
        this.push(chunk);

        callback();
      },
    }),
    csv,
    uploadStorageStream,
  );

  const uploadToStorage = uploadFileToStorage({
    contentType: 'text/csv',
    folder: 'downloads',
    fileName: `${new Date().toISOString()}-links.csv`,
    contentStream: uploadStorageStream,
  });

  const [{ url }] = await Promise.all([uploadToStorage, convertToCSVPipeline]);

  return reply.status(200).send(success({ fileUrl: url }));
}
