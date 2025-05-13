import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} from 'graphql';

// Simulated Data
const books = [
  { title: '1984', author: 'George Orwell', year: 1949, pages: 328 },
  { title: 'O Senhor dos Anéis', author: 'J.R.R. Tolkien', year: 1954, pages: 1216 },
  { title: 'O Morro dos Ventos Uivantes', author: 'Emily Brontë', year: 1847, pages: 416 },
  { title: 'Dom Quixote', author: 'Miguel de Cervantes', year: 1605, pages: 1023 },
  { title: 'A Divina Comédia', author: 'Dante Alighieri', year: 1320, pages: 798 },
  { title: 'Orgulho e Preconceito', author: 'Jane Austen', year: 1813, pages: 432 },
  { title: 'Cem Anos de Solidão', author: 'Gabriel García Márquez', year: 1967, pages: 417 },
  { title: 'O Pequeno Príncipe', author: 'Antoine de Saint-Exupéry', year: 1943, pages: 96 },
  { title: 'A Metamorfose', author: 'Franz Kafka', year: 1915, pages: 201 },
];


// Custom Types
const BookType = new GraphQLObjectType({
  name: 'Book',
  description: "Um livro com título e autor",
  fields: {
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
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => 'Olá, GraphQL com Node.js!',
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: () => books
    }
  },
})

// Schema principal
const schema = new GraphQLSchema({
  query: RootQuery,
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