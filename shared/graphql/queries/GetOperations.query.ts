import { gql } from '@apollo/client';

export const GetOperationsQuery = gql`
  query GetOperations {
    plots {
      id
      name
      date
      product
    }
  }
`;
