import { gql } from '@apollo/client';

export const CreateProductionMutation = gql`
  mutation CreateProduction($input: CreateProductionInput!) {
    createProduction(createProductionInput: $input) {
      id
      plotId
      price
      quantity
      measurementUnit   
      executionDate
    }
  }
`;