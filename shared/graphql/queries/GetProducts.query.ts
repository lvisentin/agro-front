import { gql } from '@apollo/client';

export const GetProductsQuery = gql`
  query GetProducts {
    products {
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
