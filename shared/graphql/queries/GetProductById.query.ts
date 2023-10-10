import { gql } from '@apollo/client';

export const GetProductByIdQuery = gql`
  query GetProductById($id: Int!) {
    product(id: $id) {
      id
      category {
        id
        name
      }
      property {
        id
        name
      }
      name
      quantity
      unitPrice
      measurementUnit
      minimumQuantity
    }
  }
`;
