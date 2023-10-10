import { gql } from '@apollo/client';

export const GetOperationByIdQuery = gql`
  query GetOperationById($id: Int!) {
    operation(id: $id) {
      id
      description
      plot {
        id
        size
        name
      }
      product {
        id
        name
        category {
          id
        }
        measurementUnit
        unitPrice
      }
      dosePerHecatare
      totalCost
      createdAt
      updatedAt
    }
  }
`;
