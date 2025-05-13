import { GraphQLObjectType, GraphQLNonNull, GraphQLID } from 'graphql';
import { books } from '../data/books.js';
import { BookType, AddBookInputType, UpdateBookInputType } from './types.js';

let nextId = books.length + 1;

export const RootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addBook: {
      type: BookType,
      args: { input: { type: new GraphQLNonNull(AddBookInputType) } },
      resolve: (_, { input }) => {
        const newBook = {
          id: String(nextId++),
          title: input.title,
          author: input.author,
        };
        books.push(newBook);
        return newBook;
      }
    },
    updateBook: {
      type: BookType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        input: { type: new GraphQLNonNull(UpdateBookInputType) }
      },
      resolve: (_, { id, input }) => {
        const book = books.find(book => book.id == id);
        if (!book) throw new Error('Livro não encontrado');
        if (input.title) book.title = input.title;
        if (input.author) book.author = input.author;
        return book;
      }
    }
  }
});
