import { ApolloServer } from '@apollo/server';
import fastifyApollo, { fastifyApolloDrainPlugin } from '@as-integrations/fastify'
import { typeDefs } from '../../adapters/graphql/schema';
import resolvers from '../../adapters/graphql/resolvers';
import { ApolloServerPluginCacheControl } from '@apollo/server/plugin/cacheControl';
import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { validetoken } from '../../adapters/rest/controllers/authController';

export const graphqlServer = async (app: FastifyInstance) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      ApolloServerPluginLandingPageLocalDefault(),
      ApolloServerPluginCacheControl(),
      ApolloServerPluginInlineTrace(),
    ],
  });

  await server.start();

  // Hook de validación para /graphql
  app.addHook('onRequest', async (request: FastifyRequest, reply: FastifyReply) => {
    if (request.url.startsWith('/graphql')) {
      const isValid = await validetoken(request, reply);
      if (!isValid) {
        return reply.status(401).send({ message: 'Token inválido' });
      }
    }

  });

  await app.register(fastifyApollo(server), {
    path: '/graphql',
  });
};
