import { gql } from '@apollo/client';

export const UpdateProductMutation = gql`
  mutation UpdateProduct($input: UpdateProductInput!, $id: Int!) {
    updateProduct(updateProductInput: $input, id: $id) {
      id
    }
  }
`;
