import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import FeedData from '../containers/FeedData';
import FeedSubscriptionData from '../containers/FeedSubscriptionData';
import ListComments from './ListComments';
import Comment from './Comment';

const styles = theme => ({
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
});

const enhanced = compose(withStyles(styles));

export default enhanced(({ classes }) => (
  <div className={classes.page}>
    <FeedSubscriptionData>
      {({ comment, loading }) => <Comment loading={loading} {...comment} />}
    </FeedSubscriptionData>
    <FeedData>{props => <ListComments {...props} />}</FeedData>
  </div>
));
