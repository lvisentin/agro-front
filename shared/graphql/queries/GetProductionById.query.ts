import { gql } from '@apollo/client';

export const GetProductionByIdQuery = gql`
  query GetProductionById($id: Int!) {
    production(id: $id) {
      id
      plotId
      description
      price
      quantity
      measurementUnit
      executionDate
    }
  }
`;
