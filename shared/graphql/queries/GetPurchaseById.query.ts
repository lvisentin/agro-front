import { gql } from '@apollo/client';

export const GetPurchaseByIdQuery = gql`
  query GetPurchaseById($id: Int!) {
    plot(id: $id) {
      id
      description
      category
      total
      createdAt
    }
  }
`;
