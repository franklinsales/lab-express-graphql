import {
  GraphQLObjectType, GraphQLInputObjectType, GraphQLString,
  GraphQLInt, GraphQLID, GraphQLNonNull
} from 'graphql';

// This is a custom type for the GraphQL schema
// This is used to define the structure in the GraphQL API
export const BookType = new GraphQLObjectType({
  name: 'Book',
  description: 'Um livro com título e autor',
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    author: { type: GraphQLString },
    year: { type: GraphQLInt },
    pages: { type: GraphQLInt },
  }
});

// This is a Input type for the GraphQL schema
// This is used to define the input data for the GraphQL API
export const AddBookInputType = new GraphQLInputObjectType({
  name: 'AddBookInput',
  fields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    author: { type: new GraphQLNonNull(GraphQLString) },
  }
});

// This is a Input type for the GraphQL schema
// This is used to define the input data for the GraphQL API
export const UpdateBookInputType = new GraphQLInputObjectType({
  name: 'UpdateBookInput',
  fields: {
    title: { type: GraphQLString },
    author: { type: GraphQLString },
  }
});
