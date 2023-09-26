import { gql } from '@apollo/client';

export const GetOperationsQuery = gql`
  query GetOperations {
    operations {
      id
      description
      plot {
        id
        name
      }
      product {
        id
        name
      }
      quantity
      totalCost
      createdAt
      updatedAt
      executionDate
    }
  }
`;
