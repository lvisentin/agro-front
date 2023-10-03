import { gql } from '@apollo/client';

export const CreatePurchaseMutation = gql`
  mutation CreatePurchase($input: CreatePurchaseInput!) {
    createPurchase(createPurchaseInput: $input) {
      id
    }
  }
`;
