import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID } from 'graphql';
import { books } from '../data/books.js';
import { BookType } from './types.js';

// This is the root query object
// This is used to define the entry points for the GraphQL API to the Query context
export const RootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => 'Olá, GraphQL com Node.js!',
    },
    books: { // This entry point returns a list of books
      type: new GraphQLList(BookType),
      resolve: () => books,
    },
    book: { // This entry point returns a single book by ID
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve: (_, args) => books.find(book => book.id == args.id),
    }
  }
});
