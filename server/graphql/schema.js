//Graphql Schema
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `
  type User {
    id: ID!
    firstname: String!
    surname: String!
    username: String!
    code: [Codebase]!
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
    findCode(id: Int!): [Codebase]
  }

  type Mutation {
    # A mutation to add a new snippet of code or a new user
    addCode(code: String! user_id: Int): Codebase
    addUser(username: String! firstname: String! surname: String!): User
  }
`;

export const schema = makeExecutableSchema({ typeDefs, resolvers });
