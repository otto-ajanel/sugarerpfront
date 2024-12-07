import express from 'express';
import { graphqlServer } from './graphql/graphqlServer';
import { restServer } from './rest/restServer';

const app = express();

// Middlewares
app.use(express.json());

// Start GraphQL Server
graphqlServer(app);

// Start REST API Server
restServer.listen(3001, () => {
  console.log('REST API server listening on port 3001');
});


