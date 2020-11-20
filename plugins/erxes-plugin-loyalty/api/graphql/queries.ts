import { paginate } from 'erxes-api-utils'

const carQueries = [
  /**
   * Cars list
   */
  {
    name: 'customerLoyalties',
    handler: async (_root, params, { models, checkPermission, user }) => {
      await checkPermission('showLoyalties', user);
      return paginate(models.Loyalties.getLoyalties(models, params.customerId), {
        page: params.page,
        perPage: params.perPage
      })
    }
  },
  {
    name: 'customerLoyalty',
    handler: async(_root, params, {models, checkPermission, user}) => {
      await checkPermission('showLoyalties', user);

      return models.Loyalties.getLoyaltyValue(models, params.customerId);
    }
  }
]

const queries = [
  ...carQueries
]

export default queries;