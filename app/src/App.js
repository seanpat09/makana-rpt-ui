import React, { Fragment } from 'react';
import { ApolloProvider, Subscription } from 'react-apollo';
import ApolloClient from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { graphql, compose } from 'react-apollo';
import { get } from 'lodash';
import gql from 'graphql-tag';
import logo from './logo.svg';
import './App.css';

const WS_URL = 'ws://localhost:4000';
const HTTP_URL = 'http://localhost:4000';

const wsLink = new WebSocketLink({
  uri: WS_URL,
  options: {
    reconnect: true
  }
});
const httpLink = new HttpLink({
  uri: HTTP_URL
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

const ListPosts = ({ comments }) => (
  <Fragment>
    {comments && comments.map(({ id, message }) => <h3 key={id}>{message}</h3>)}
  </Fragment>
);

const QueryView = ({ data: { loading, feed } }) => (
  <div>{loading ? <div>loading...</div> : <ListPosts comments={feed} />}</div>
);

const QueryFeed = compose(
  graphql(
    gql`
      query feed {
        feed {
          id
          message
        }
      }
    `
  )
)(QueryView);

const FEED_SUBSCRIPTION = gql`
  subscription {
    feedSubscription {
      node {
        id
        message
      }
    }
  }
`;

const SubscriptionFeed = () => (
  <Subscription subscription={FEED_SUBSCRIPTION}>
    {({ data, loading }) => (
      <h4>
        {!loading && (
          <span>
            {get(data, 'feedSubscription.node.id')}:{' '}
            {get(data, 'feedSubscription.node.message')}
          </span>
        )}
      </h4>
    )}
  </Subscription>
);

const App = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <QueryFeed />
        <SubscriptionFeed />
      </header>
    </div>
  </ApolloProvider>
);

export default App;
