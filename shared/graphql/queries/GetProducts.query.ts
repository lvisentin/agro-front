import { gql } from '@apollo/client';

export const GetProductsQuery = gql`
  query GetProducts($propertyId: Int, $name: String) {
    products(propertyId: $propertyId, name: $name) {
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
