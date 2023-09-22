import { gql } from '@apollo/client';

export const UpdateOperationMutation = gql`
  mutation UpdateOperation($id: Int!, $input: UpdateOperationInput!) {
    updateOperation(id: $id, updateOperationInput: $input) {
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
