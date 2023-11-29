import { gql } from '@apollo/client';

export const GetProductionQuery = gql`
  query GetProductions($plotId: Int) {
    productions(plotId: $plotId) {
      id
      plotId
      plot {
        id
        name
      }
      description
      price
      quantityPerHectare
      measurementUnit
      executionDate
      createdAt
      updatedAt
    }
  }
`;
