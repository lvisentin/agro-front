import { gql } from '@apollo/client';

export const EditDocumentMutation = gql`
  mutation updateDocument($input: UpdateDocumentInput!, $id: Int!) {
    updateDocument(updateDocumentInput: $input, id:$id) {
      id
    }
  }
`;
