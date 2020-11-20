import { withFilter } from 'apollo-server-express';
import { graphqlPubsub } from 'erxes-api-utils';

export default {
  /*
   * Listen for notification
   */
  notificationInserted: {
    subscribe: withFilter(
      () => graphqlPubsub.asyncIterator('notificationInserted'),
      (payload, variables) => {
        return payload.notificationInserted.userId === variables.userId;
      }
    )
  }
};
