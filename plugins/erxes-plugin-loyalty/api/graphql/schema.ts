export const types = `
  type CustomerLoyalty {
    customer: Customer
    loyalty: Float
  }

  type Loyalty {
    modifiedAt: Date,
    customerId: String,
    value: Float,
    dealId: String,
    userId: String,

    user: User
    customer: Customer
    deal: Deal
  }
`;

export const queries = `
  customerLoyalties(
    customerId: String!
    page: Int
    perPage: Int
  ): [Loyalty]

  customerLoyalty(
    customerId: String!
  ): Float
`;
