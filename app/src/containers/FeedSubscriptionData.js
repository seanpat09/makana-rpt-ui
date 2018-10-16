import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose, withProps, toRenderProps } from 'recompose';
import { get } from 'lodash';

const query = gql`
  subscription {
    feedSubscription {
      node {
        id
        message
        updatedAt
      }
      mutation
    }
  }
`;

const enhanced = compose(
  graphql(query),
  withProps(({ data: { feedSubscription } }) => ({
    ...get(feedSubscription, 'node', {}),
    type: get(feedSubscription, 'mutation')
  }))
);

export default toRenderProps(enhanced);
