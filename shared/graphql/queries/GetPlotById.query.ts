import { gql } from '@apollo/client';

export const GetPlotByIdQuery = gql`
  query GetPlotById($id: Int!) {
    plot(id: $id) {
      id
      name
      description
      propertyId
      size
    }
  }
`;
