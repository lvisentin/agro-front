import { gql } from '@apollo/client';

export const UpdateProductionMutation = gql`
  mutation UpdateProduction($input: UpdateProductionInput!) {
    updateProduction(id: $id, updateProductionInput: $input) {
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