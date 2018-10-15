import { compose, lifecycle, renderNothing } from 'recompose';
import { withSnackbar } from 'notistack';

export default compose(
  withSnackbar,
  lifecycle({
    componentWillReceiveProps(nextProps) {
      if (this.props === nextProps) {
        return;
      }

      this.props.enqueueSnackbar(nextProps.message, { variant: 'info' });
    }
  }),
  renderNothing
)();
