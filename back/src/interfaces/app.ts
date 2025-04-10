import { graphqlServer } from './graphql/graphqlServer';
import restServer from './rest/restServer';

async function startServer() {
  try {
    await graphqlServer(restServer); // Aquí registras GraphQL dentro de Fastify
    await restServer.listen({ port: 3001 });
    console.log('🚀 REST API + GraphQL running on http://localhost:3001');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

startServer();