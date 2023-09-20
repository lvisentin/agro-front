import { gql } from '@apollo/client';

export const DeleteDocumentMutation = gql`
  mutation deleteDocument($id: Int!) {
    deleteDocument(id: $id) {
      id
      name
      path
    }
  }
`;
