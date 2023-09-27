import { gql } from '@apollo/client';

export const DeletePropertyMutation = gql`
  mutation DeleteProperty($id: Int!) {
    deleteProperty(id: $id) {
      id
    }
  }
`;
