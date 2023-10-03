import { gql } from '@apollo/client';

export const DeletePurchaseMutation = gql`
  mutation deletePurchase($id: Int!) {
    deletePurchase(id: $id) {
      id
    }
  }
`;
