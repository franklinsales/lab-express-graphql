import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import {
  // Structures for GraphQL
  GraphQLSchema, //This is the main GraphQL schema object
  GraphQLObjectType, //This is the object type for the schema
  GraphQLInputObjectType, //This is the input object type for the schema
  GraphQLNonNull, //This is the non-null type for the schema

  // Types for GraphQL
  GraphQLString, //This is the string type for the schema
  GraphQLList, //This is the list type for the schema
  GraphQLInt, //This is the integer type for the schema
  GraphQLID, //This is the ID type for the schema
} from 'graphql';

// Simulated Data
let books = [
  { id: 1, title: '1984', author: 'George Orwell', year: 1949, pages: 328 },
  { id: 2, title: 'O Senhor dos Anéis', author: 'J.R.R. Tolkien', year: 1954, pages: 1216 },
  { id: 3, title: 'O Morro dos Ventos Uivantes', author: 'Emily Brontë', year: 1847, pages: 416 },
  { id: 4, title: 'Dom Quixote', author: 'Miguel de Cervantes', year: 1605, pages: 1023 },
  { id: 5, title: 'A Divina Comédia', author: 'Dante Alighieri', year: 1320, pages: 798 },
  { id: 6, title: 'Orgulho e Preconceito', author: 'Jane Austen', year: 1813, pages: 432 },
  { id: 7, title: 'Cem Anos de Solidão', author: 'Gabriel García Márquez', year: 1967, pages: 417 },
  { id: 8, title: 'O Pequeno Príncipe', author: 'Antoine de Saint-Exupéry', year: 1943, pages: 96 },
  { id: 9, title: 'A Metamorfose', author: 'Franz Kafka', year: 1915, pages: 201 },
];


// Custom Types
const BookType = new GraphQLObjectType({
  name: 'Book',
  description: "Um livro com título e autor",
  fields: {
    id: {
      type: GraphQLID,
    },
    title: {
      type: GraphQLString,
    },
    author: {
      type: GraphQLString,
    },
    year: {
      type: GraphQLInt,
    },
    pages: {
      type: GraphQLInt,
    },
  }
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'Query',
  description: 'Query Root',
  fields: { // This is the root query object fields
    // The fields of the root query are used to define the entry points for the GraphQL API
    hello: {
      type: GraphQLString, // The type of the field in a RootQuery is used to define the type of the data that will be returned
      resolve: () => 'Olá, GraphQL com Node.js!', // The resolve function is used to return the data for the field
    },
    books: { // This entry point returns a list of books
      type: new GraphQLList(BookType),
      resolve: () => books
    },
    book: { // This entry point returns a single book by ID
      type: BookType,
      description: 'Um livro específico',
      args: {
        id: { type: GraphQLID },
      },
      resolve: (parent, args) => { // The resolve function is used to return the data for the field, parent is the parent object, args is the arguments passed to the field
        // Parent wasn't used in this case, because we don't have a parent object
        // args is an object that contains the arguments passed to the field
        // In this case, we are using the id argument to find the book in the books array
        return books.find(book => book.id == args.id);
      }
    }
  },
})

let nextId = books.length + 1; // This is the next ID to be used for the new book

// This is a Input Object Type, which is used to define the input data for the mutation
// This is the POST request body equivalent
const AddBookInputType = new GraphQLInputObjectType({
  name: 'AddBookInput',
  description: 'Campos obrigatórios para adicionar um livro',
  fields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    author: { type: new GraphQLNonNull(GraphQLString) },
  }
});

// This is the update Input
// This is the PATCH request body equivalent
const UpdateBookInputType = new GraphQLInputObjectType({
  name: 'UpdateBookInput',
  description: 'Campos obrigatórios para atualizar um livro',
  fields: {
    title: { type: GraphQLString },
    author: { type: GraphQLString },
  }
});

// Mutation Root
// This is the root mutation object fields
const RootMutation = new GraphQLObjectType({
  name: 'Mutation', // This is the name of the mutation object
  fields: { // This is the fields of the mutation object
    // The fields of the mutation object are used to define the entry points for the GraphQL API
    addBook: { // This is a entry point
      type: BookType, // This is the type of the data that will be returned
      description: 'Adicionar um livro',
      args: { // This is the arguments passed to the field
        input: { type: new GraphQLNonNull(AddBookInputType) },
      },
      resolve: (parent, {input}) => { // The resolve function is used to handle the mutation
        // The parent object is not used in this case, because we don't have a parent object
        // The input argument is an object that contains the input data for the mutation

        // From here, we can use the input data to create a new book
        const newBook = {
          id: String(nextId++),
          title: input.title,
          author: input.author,
        };
        books.push(newBook); // Add the new book to the books array
        return newBook; // Return the new book
      }
    },
    updateBook: {
      type: BookType,
      description: 'Atualizar um livro',
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        input: {type: new GraphQLNonNull(UpdateBookInputType)},
      },
      resolve: (parent, {id, input}) => {
        const book = books.find(book => book.id == id); // Find the book by ID
        if (!book) {
          throw new Error('Livro não encontrado'); // If the book is not found, throw an error
        }
        // If the book is found, update the book with the input data
        book.title = input.title || book.title; // Update the title if it is provided
        book.author = input.author || book.author; // Update the author if it is provided
        return book; // Return the updated book
      }
    }
  }
});

// Schema principal
const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

// Initialize Express
const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true, // Habilita a interface GraphiQL
}));

app.listen(4000, () => {
  console.log('Servidor rodando em http://localhost:4000/graphql');
});