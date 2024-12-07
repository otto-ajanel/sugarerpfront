import gql from 'graphql-tag';
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
