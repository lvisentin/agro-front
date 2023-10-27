import { gql } from '@apollo/client';

export const GetDocumentsQuery = gql`
  query GetDocuments {
    documents {
      id
      name
      path
      url
      createdAt
    }
  }
`;
