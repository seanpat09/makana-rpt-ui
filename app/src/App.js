import React, { Fragment } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import logo from './logo.svg';
import './App.css';

const client = new ApolloClient({
  // TODO: via environment config
  uri: 'http://localhost:4000'
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

const App = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <QueryFeed />
      </header>
    </div>
  </ApolloProvider>
);

export default App;
