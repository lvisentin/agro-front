import { gql } from '@apollo/client';

export const GetOperationsQuery = gql`
  query GetOperations {
    operations {
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
      quantity
      totalCost
      createdAt
      updatedAt
      executionDate
    }
  }
`;