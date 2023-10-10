import { gql } from '@apollo/client';

export const CreatePlotMutation = gql`
  mutation CreatePlot($input: CreatePlotInput!) {
    createPlot(createPlotInput: $input) {
      id
      name
      propertyId
      farmingType
      size
    }
  }
`;
