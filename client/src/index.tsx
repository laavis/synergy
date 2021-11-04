import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  ApolloLink,
  concat,
} from '@apollo/client';

import { App } from './App';

const httpLink = new HttpLink({ uri: 'http://localhost:3000/graphql' });
const authMiddleware = new ApolloLink((request, forward) => {
  const operationName = request.operationName;
  // console.log({ operationName });
  const token = sessionStorage.getItem('access-token');

  request.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${token}` || null,
    },
  }));

  return forward(request);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
