import { gql } from '@apollo/client';

export const GetPurchasesQuery = gql`
  query GetPurchases {
    plots {
      id
      description
      category
      total
      createdAt
    }
  }
`;
