import { gql } from '@apollo/client';

export const GetPurchaseByIdQuery = gql`
  query GetPurchaseById($id: Int!) {
    purchase(id: $id) {
      id
      description
      propertyId
      property {
        id
        name
      }
      totalCost
      purchaseProducts {
        id
        unitPrice
      }
      createdAt
      updatedAt
    }
  }
`;
