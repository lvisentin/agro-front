import { gql } from '@apollo/client';

export const CreatePropertyMutation = gql`
  mutation CreateProperty($input: CreatePropertyInput!) {
    createProperty(createPropertyInput: $input) {
      id
      name
      description
      size
      createdAt
      updatedAt
    }
  }
`;
