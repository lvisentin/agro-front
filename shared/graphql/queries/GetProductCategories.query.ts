import { gql } from '@apollo/client';

export const GetProductCategoriesQuery = gql`
  query GetProductCategories {
    productCategories {
      id
      name
    }
  }
`;
