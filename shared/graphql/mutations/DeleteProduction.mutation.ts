import { gql } from '@apollo/client';

export const DeleteProductionMutation = gql`
  mutation DeleteProduction($id: Int!) {
    deleteProduction(id: $id) {
      id
    }
  }
`;
