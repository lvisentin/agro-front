import { gql } from '@apollo/client';

export const UpdatePurchaseMutation = gql`
  mutation UpdatePurchase($id: Int!, $input: UpdatePurchaseInput!) {
    updatePurchase(id: $id, updatePurchaseInput: $input) {
      id
      product
      quantity
      total
      category
      description
      createdAt
    }
  }
`;
