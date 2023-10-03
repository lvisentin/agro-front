import { gql } from '@apollo/client';

export const CreatePurchaseMutation = gql`
  mutation CreatePurchase($input: CreatePurchaseInput!) {
    createPurchase(createPurchaseInput: $input) {
      propertyId
      description
      products {
        code
        amountPerUnit
        units
      }
    }
  }
`;