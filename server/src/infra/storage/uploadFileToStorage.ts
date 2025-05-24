import { Upload } from '@aws-sdk/lib-storage';
import { randomUUID } from 'node:crypto';
import { basename, extname } from 'node:path';
import { Readable } from 'node:stream';
import { z } from 'zod';
import { r2 } from './client';
import { env } from '@/env';

const uploadFileToStorageInput = z.object({
  folder: z.enum(['downloads']),
  fileName: z.string(),
  contentType: z.string(),
  contentStream: z.instanceof(Readable),
});

type UploadFileToStorageInput = z.input<typeof uploadFileToStorageInput>;

export async function uploadFileToStorage(input: UploadFileToStorageInput) {
  const { contentStream, contentType, fileName, folder } = uploadFileToStorageInput.parse(input);

  const fileExtension = extname(fileName);
  const fileNameWithoutExtension = basename(fileName);

  const sanitizedFileName = fileNameWithoutExtension.replace(/[^a-zA-Z0-9]/g, '');
  const sanitizedFileNameWithExtension = sanitizedFileName.concat(fileExtension);

  const uniqueFileName = `${folder}/${randomUUID()}-${sanitizedFileNameWithExtension}`;

  const upload = new Upload({
    client: r2,
    params: {
      Key: uniqueFileName,
      Bucket: env.CLOUDFLARE_BUCKET,
      ContentType: contentType,
      Body: contentStream,
    },
  });

  await upload.done();

  return {
    key: uniqueFileName,
    url: new URL(uniqueFileName, env.CLOUDFLARE_PUBLIC_URL).toString(),
  };
}
