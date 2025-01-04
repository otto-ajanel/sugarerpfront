import { ApolloServer } from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4'
import express from 'express';
import  resolvers  from '../../adapters/graphql/resolvers';
import { typeDefs } from '../../adapters/graphql/schema';
import { ApolloServerPluginCacheControl } from '@apollo/server/plugin/cacheControl';
import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { UserService,IUserService } from '../../application/userServices';
import { UserRepository } from '../../domain/repositories/userRepository';

export const graphqlServer = async (app: express.Application) => {
 
  const server = new ApolloServer({
    typeDefs,
    resolvers, 
    plugins: [
      ApolloServerPluginLandingPageLocalDefault(),  // Página de inicio de Apollo
      ApolloServerPluginCacheControl(),
      ApolloServerPluginInlineTrace(),
    ],
  });-
  await server.start()
  app.use(
    '/graphql', 
    expressMiddleware(server) as any
  );
};