import { gql } from '@apollo/client';

export const CreateOperationMutation = gql`
  mutation CreateOperation($input: CreateOperationInput!) {
    createOperation(createOperationInput: $input) {
      id
    }
  }
`;
