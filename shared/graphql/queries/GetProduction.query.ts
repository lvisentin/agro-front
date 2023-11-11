import { gql } from '@apollo/client';

export const GetProductionQuery = gql`
query GetProductions($plotId: Float) {
  productions(plotId: $plotId) {
    id
    plotId
    plot {
      id
      size
      name
    }
    price
    quantity
    measurementUnit
    executionDate
    createdAt
    updatedAt
  }
}
`;
