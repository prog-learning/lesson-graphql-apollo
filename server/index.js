const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const app = express();

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'hello',
    fields: () => ({
      message: {
        type: GraphQLString,
        resolve: () => 'hello gql'
      }
    })
  })
});

app.use('/hello', graphqlHTTP({
  // schema: schema,
  graphiql: true
}));

app.listen(4000, () => console.log('Server Running!! port:4000'));
