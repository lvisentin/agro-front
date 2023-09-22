import { gql } from '@apollo/client';

export const CreateOperationMutation = gql`
  mutation createOperation($input: createOperationInput!) {
    createOperation(createOperationInput: $input) {
      name
      date
      product
      costPerPlot
      costPerHa
      unityCost
      productType
      unity
      dose
      plot
    }
  }
`;
