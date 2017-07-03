//Graphql Schema
import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';

const typeDefs = `
  type User {
    id: Int!
    firstname: String
    surname: String
    username: String
  }

  type Codebase {
    id: Int!
    user_id: Int!
    code: String!;
  }

  # the schema allows the following queries

  type Query {
    users: [User]
    user(id: Int!): User
    code(id: Int!): findCode
  }
`;

export const schema = makeExecutableSchema({ typeDefs, resolvers });
