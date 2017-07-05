//Graphql Schema
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `
  type User {
    id: ID!
    firstname: String!
    surname: String!
    username: String!
    code: [Codebase]
  }

  type Codebase {
    id: ID!
    user_id: Int!
    code: String!
  }

  # the schema allows the following queries

  type Query {
    users: [User]
    user(id: Int!): [User]
    findCode(id: Int!): [User]
  }
`;

export const schema = makeExecutableSchema({ typeDefs, resolvers });
