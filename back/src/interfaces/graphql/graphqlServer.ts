import { ApolloServer } from '@apollo/server';
import express from 'express';
import  resolvers  from '../../adapters/graphql/resolvers';
import { typeDefs } from '../../adapters/graphql/schema';
const { startStandaloneServer } = require('@apollo/server/standalone');

import { UserService } from '../../application/userServices';
import { UserRepository } from '../../domain/repositories/userRepository';

export const graphqlServer = async (app: express.Application) => {
  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);

  const server = new ApolloServer({
    typeDefs,
    resolvers
    //,context: () => ({ userService })
  });
  async function startServer() {
    // Inicia el servidor de Apollo sin necesidad de Express
    const { url } = await startStandaloneServer(server, {
      listen: { port: 3000 },  // Configura el puerto para el servidor GraphQL
    });
  
    console.log(`GraphQL server is running at ${url}`);
  }
  
  startServer().catch((error) => {
    console.error('Error starting Apollo Server:', error);
  });

  /* await server.start();
  //app.use('/graphql', server.getMiddleware());
  server.applyMiddleware({ app, path: '/graphql' });

  // Configura el puerto en el cual Express estará escuchando
  app.listen(3001, () => {
    console.log('REST API server listening on port 3001');
    console.log('GraphQL server listening on port 3000');
  }); */
};
