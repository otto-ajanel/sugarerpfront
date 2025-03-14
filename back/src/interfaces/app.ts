import express from 'express';
import { graphqlServer } from './graphql/graphqlServer';
import  restServer  from './rest/restServer';


  graphqlServer(restServer);
restServer.listen(3001, () => {
  console.log('REST API server with grahpql listening on port 3001');
});
