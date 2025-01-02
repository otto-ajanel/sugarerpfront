import gql from 'graphql-tag';
export const typeDefs = gql`
  type Query {
    users(id:Int): [User]
    persons: [User]
    
  }

  type Mutation {
    createUser(user_email: String!): User
  }

  type User {
    user_id: ID!
    user_email: String!
  }
`;
