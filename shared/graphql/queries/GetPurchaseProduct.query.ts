import { gql } from '@apollo/client';

export const GetPurchaseProductQuery = gql`
  query GetPurchaseProduct {
    purchases {
      id
      purchaseId
      purchase
      productId
      product
      amountPerUnit
      units
      unitPrice
      totalCost
      createdAt
      updatedAt
    }
  }
`;