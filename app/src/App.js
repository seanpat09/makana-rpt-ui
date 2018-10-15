import React from 'react';
import TestPage from './components/TestPage';
import DataProvider from './providers/DataProvider';
import ThemeProvider from './providers/ThemeProvider';

// const SubscriptionView = ({ data: { feedSubscription } }) => {
//   const comment = get(feedSubscription, 'node');
//   return <CommentView {...comment} />;
// };

// const FeedSubscription = compose(
//   graphql(
//     gql`
//       subscription {
//         feedSubscription {
//           node {
//             id
//             message
//             createdAt
//           }
//         }
//       }
//     `
//   )
// )(SubscriptionView);

const App = () => (
  <DataProvider>
    <ThemeProvider>
      <TestPage />
    </ThemeProvider>
  </DataProvider>
);

export default App;
