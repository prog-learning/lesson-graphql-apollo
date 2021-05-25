import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client';

/* APIを叩く */
const httpLink = createHttpLink({ uri: 'http://localhost:4000', });
const client = new ApolloClient({
  // uri: 'https://localhost:4000/', // これLocalだとエラー
  link: httpLink, // こうする
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
