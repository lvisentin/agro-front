import { gql } from '@apollo/client';

export const UpdatePropertyMutation = gql`
  mutation UpdateProperty($id: Int!, $input: UpdatePropertyInput!) {
    updateProperty(id: $id, updatePropertyInput: $input) {
      id
      name
      description
      size
      createdAt
      updatedAt
    }
  }
`;
