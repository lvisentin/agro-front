import { gql } from '@apollo/client';

export const CreateProductionMutation = gql`
  mutation CreateProduction($input: CreateProductionInput!) {
    createProduction(createProductionInput: $input) {
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