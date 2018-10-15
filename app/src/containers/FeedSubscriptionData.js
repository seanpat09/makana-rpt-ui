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
        createdAt
      }
    }
  }
`;

const enhanced = compose(
  graphql(query),
  withProps(({ data: { feedSubscription } }) =>
    get(feedSubscription, 'node', {})
  )
);

export default toRenderProps(enhanced);
