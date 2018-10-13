import React, { Fragment } from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import logo from "./logo.svg";
import "./App.css";

const client = new ApolloClient({
  // TODO: via environment config
  uri: "http://localhost:4000"
});

const ListPosts = ({ posts }) => (
  <Fragment>
    {posts.map(({ id, title }) => (
      <h3 key={id}>{title}</h3>
    ))}
  </Fragment>
);

const QueryView = ({ data: { loading, feed } }) => (
  <div>{loading ? <div>loading...</div> : <ListPosts posts={feed} />}</div>
);

const QueryFeed = compose(
  graphql(
    gql`
      query feed {
        feed {
          id
          title
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
