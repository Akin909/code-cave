//Graphql Schema
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `
  type User {
    id: ID!
    email: String!
    username: String!
    password: String
    code: [Codebase]
  }

  type Codebase {
    id: ID!
    user_id: Int!
    code: String!
  }

  input AddUserInput {
    username: String!
    email: String!
    password: String!
  }

  type AddUserReturnPayload {
    id: ID!
    email: String!
    username: String!
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
    addUser(input: AddUserInput!): AddUserReturnPayload
  }
`;

export const schema = makeExecutableSchema({ typeDefs, resolvers });
