import { gql } from '@apollo/client';

export const GetPurchasesQuery = gql`
  query GetPurchases {
    purchases {
      id
      description
      propertyId
      property {
        id
        name
      }
      purchaseProducts {
        id
        unitPrice
        units
      }
      totalCost
      createdAt
      updatedAt
    }
  }
`;
