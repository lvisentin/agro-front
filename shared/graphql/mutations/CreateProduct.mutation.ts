import { gql } from '@apollo/client';

export const CreateProductMutation = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(createProductInput: $input) {
      id
    }
  }
`;
