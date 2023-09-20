import { gql } from '@apollo/client';

export const CreateDocumentMutation = gql`
  mutation createDocument($input: CreateDocumentInput!) {
    createDocument(createDocumentInput: $input) {
      id
      name
      path
    }
  }
`;
