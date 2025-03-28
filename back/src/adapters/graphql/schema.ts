import gql from 'graphql-tag';
export const typeDefs = gql`
  type Query {
    users(id:Int): [User]
    modules: [Module]
    
  }

  type Mutation {
    createUser(user_email: String!): User
  }

  type User {
    id_user: ID!
    email: String!
    id_usertype: Int!
  }

  type Module{
    id_module: ID!
    module_name: String!
    description: String!
  }
`;
 