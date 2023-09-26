import { gql } from '@apollo/client';

export const DeleteOperationMutation = gql`
  mutation DeleteOperation($id: Int!) {
    deleteOperation(id: $id) {
      id
      name
      path
    }
  }
`;
