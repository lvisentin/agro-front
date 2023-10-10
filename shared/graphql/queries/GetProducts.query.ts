import { gql } from '@apollo/client';

export const GetProductsQuery = gql`
  query GetProducts($propertyId: Int) {
    products(propertyId: $propertyId) {
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
