import { gql } from '@apollo/client';

export const UpdatePlotMutation = gql`
  mutation UpdatePlot($id: Int!, $input: UpdatePlotInput!) {
    updatePlot(id: $id, updatePlotInput: $input) {
      id
      name
      farmingType
      size
      propertyId
      createdAt
      updatedAt
    }
  }
`;
