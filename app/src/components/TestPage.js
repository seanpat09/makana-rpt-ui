import React from 'react';
import FeedData from '../containers/FeedData';
import ListComments from './ListComments';

export default () => (
  <FeedData>{props => <ListComments {...props} />}</FeedData>
);
