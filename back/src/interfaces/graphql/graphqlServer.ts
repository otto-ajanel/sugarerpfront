import { ApolloServer } from '@apollo/server';
import express from 'express';
import { resolvers } from '../../adapters/graphql/resolvers';
import { typeDefs } from '../../adapters/graphql/schema';
import { UserService } from '../../application/userService';
import { UserRepository } from '../../domain/repositories/userRepository';

export const graphqlServer = async (app: express.Application) => {
  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ userService })
  });

  await server.start();
  app.use('/graphql', server.getMiddleware());
};
