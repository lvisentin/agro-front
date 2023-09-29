import { gql } from '@apollo/client';

export const DeleteProductMutation = gql`
  mutation DeleteProduct($id: Int!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;
