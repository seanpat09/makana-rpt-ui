import { compose, lifecycle, renderNothing } from 'recompose';
import { withSnackbar } from 'notistack';
import { get } from 'lodash';

const messageTypeMapping = {
  CREATED: 'success',
  UPDATED: 'info'
};

const messageType = type => get(messageTypeMapping, type, 'error');

export default compose(
  withSnackbar,
  lifecycle({
    componentWillReceiveProps(nextProps) {
      if (this.props === nextProps) {
        return;
      }

      console.log('notice type', nextProps.type);

      this.props.enqueueSnackbar(nextProps.message || 'Message Deleted', {
        variant: messageType(nextProps.type)
      });
    }
  }),
  renderNothing
)();
