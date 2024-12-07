import { gql } from '@apollo/server';

export const typeDefs = gql`
  type Query {
    users: [User]
  }

  type Mutation {
    createUser(name: String!): User
  }

  type User {
    id: ID!
    name: String!
  }
`;
