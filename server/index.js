/* Lesson GraphQL */

/* 今回使用するサンプルデータ */
const fruits = [
  { id: '0', icon: '🍎', name: 'apple', color: 'red', description: 'スティーブ・ジョブズ' },
  { id: '1', icon: '🍌', name: 'banana', color: 'yellow', haveEaten: true },
  { id: '2', icon: '🍒', name: 'cherry', color: 'red' },
];
let _id = 3;

/* Queryの型を定義する */
/**
 * スカラー型の種類
 * Int...符号付き32ビット整数
 * String...文字列
 * Boolean...真偽値
 * ID...IDとしてのString
 * !は必須項目の意味
 */
const typeDefs = `
  # Query Type ...最上位のデータの型を定義（名前は常に"Query"）
  type Query {
    greet: String!,
    totalFruits: Int!,
    allFruits: [Fruit]!,
  }

  # Mutation Type...更新関数の引数と戻り値の型を定義
  type Mutation {
    # addFruit(icon: String!, name: String!, color: String!, description: String): String!
    addFruit(data: PostFruit!): String!
    eatFruit(name: String!): [Fruit]!
    # removeFruit(name:String! description:String): Boolean!
  }

  # Object Type...型をオブジェクト化
  type Fruit {
    id: ID!,
    icon: String!,
    name: String!,
    color: FruitColor!,
    description: String,
    haveEaten: Boolean,
  }

  # Input Type...Mutationの引数に使う型をまとめる
  input PostFruit {
    icon: String!,
    "ここは果物の名前です.（ここに公開される注釈を書くことができます.）"
    name: String!,
    "果物の色を教えて下さい"
    color: FruitColor!,
    "ここは説明です.オプショナルです."
    description: String,
  }

  # Enum Type...特定の文字列のみの型を作成
  enum FruitColor {
    red
    green
    orange
    yellow
    blue
    purple
    pink
  }
`;


// typeDefsとresolversと一致するように
const resolvers = {
  Query: {
    greet: () => 'Hello GraphQL!!',
    totalFruits: () => fruits.length,
    allFruits: () => fruits,
  },
  Mutation: {
    addFruit(parent, args) {
      // 処理を書く
      console.log(parent);
      console.log(args);
      // 引数はargsにオブジェクトで入る
      // let newFruits = { id: _id++, haveEaten: false, ...args };
      let newFruits = { id: _id++, haveEaten: false, ...args.data }; // 引数$inputをdataにまとめたとき
      fruits.push(newFruits);
      // データベースに保存する処理もここに
      // return `${args.name}を拾った`;
      return `${args.data.name}を拾った`; // 引数$inputをdataにまとめたとき
    },
    eatFruit(parent, args) {
      fruits.map(fruit => {
        if (fruit.name === args.name) {
          fruit.haveEaten = true;
          return fruit;
        }
        return fruit;
      });
      return fruits;
    }
  }
};

/* Apollo Server の作成と起動 */
const { ApolloServer } = require('apollo-server');
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(4000).then(() => console.log('localhost:4000で実行中...'));;
