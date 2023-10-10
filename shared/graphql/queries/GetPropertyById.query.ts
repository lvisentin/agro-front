import { gql } from '@apollo/client';

export const GetPropertyByIdQuery = gql`
  query GetPropertyById($id: Int!) {
    property(id: $id) {
      id
      name
      farmer
      description
      size
    }
  }
`;
