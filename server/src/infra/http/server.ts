import { env } from '@/env';
import fastifyCors from '@fastify/cors';
import fastify from 'fastify';
import {
  hasZodFastifySchemaValidationErrors,
  serializerCompiler,
  jsonSchemaTransform,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import fastifyMultipart from '@fastify/multipart';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { linkRoutes } from '@/routes/links';

const server = fastify();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.setErrorHandler((error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.validation,
    });
  }

  return reply.status(500).send({ message: 'Internal server error.' });
});

server.register(fastifyCors, { origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] });

server.register(fastifyMultipart);

server.register(fastifySwagger, {
  openapi: {
    info: { title: 'URL Shortener', version: '1.0.0' },
  },
  transform: jsonSchemaTransform,
  // TODO: descomentar quando for ajeitar mais na frente
  // transform: transformSwaggerSchema,
});

server.register(fastifySwaggerUi, {
  routePrefix: '/docs',
});

server.register(linkRoutes);

server.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  console.log('HTTP server runing');
});
