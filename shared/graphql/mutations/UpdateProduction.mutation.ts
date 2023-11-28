import { gql } from '@apollo/client';

export const UpdateProductionMutation = gql`
  mutation UpdateProduction($id: Int!, $input: UpdateProductionInput!) {
    updateProduction(id: $id, updateProductionInput: $input) {
      id
      plotId
      description
      price
      quantityPerHectare
      measurementUnit
      executionDate
    }
  }
`;
