import { graphqlPubsub } from 'erxes-api-utils';

export default {
  /*
   * Listen for activity log connection
   */
  activityLogsChanged: {
    subscribe: () => graphqlPubsub.asyncIterator('activityLogsChanged')
  }
};
