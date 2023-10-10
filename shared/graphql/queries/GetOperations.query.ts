import { gql } from '@apollo/client';

export const GetOperationsQuery = gql`
  query GetOperations($plotId: Int) {
    operations(plotId: $plotId) {
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
      executionDate
    }
  }
`;
