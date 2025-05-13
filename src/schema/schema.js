import { GraphQLSchema } from 'graphql';
import { RootQuery } from './queries.js';
import { RootMutation } from './mutations.js';

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
