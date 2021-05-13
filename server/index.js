const express = require('express');
// const { graphqlHTTP } = require('express-graphql');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const { ApolloServer } = require('apollo-server');

// const app = express();

// 型を定義
/**
 * 型
 * Int...符号付き32ビット整数
 * String
 * Boolean
 * ID
 */
const typeDefs = `
  type Query {
    totalPhotos: Int!,
    isDone: Boolean,
    allPhotos: [Photo]!,
  }

  type Mutation {
    postPhoto(name:String! description:String):Boolean!
  }

  type Photo {
    id:ID!,
    name: String!,
    url: String!,
    description: String,
  }
  type Fruit {
    id:ID!,
    name: String!,
    color: String!,
    description: String,
    ate: Boolean,
  }

`;

let _id = 0;
const photos = [
  {
    id: 99,
    name: 'sample',
    url: 'aaaa',
    description: 'bbb',
  },
];

// typeDefsとresolversと一致するように
const resolvers = {
  Query: {
    totalPhotos: () => photos.length,
    isDone: () => false,
    allPhotos: () => photos,
    // fruits: () => fruits,
  },
  Mutation: {
    postPhoto(parent, args) {
      // 処理を書く
      let newPhoto = { id: _id++, ...args };
      photos.push(newPhoto);
      // データベースに保存する処理もここに
      return true;
    }
  }
};


const fruits = [
  { name: 'apple', color: 'red' },
  { name: 'banana', color: 'yellow' },
  { name: 'cherry', color: 'red' },
];

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(4000).then(() => console.log('4000だよ'));;
