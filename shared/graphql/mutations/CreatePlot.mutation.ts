import { gql } from '@apollo/client';

export const CreatePropertyMutation = gql`
  mutation CreatePlot($input: CreatePlotInput!) {
    createPlot(createPlotInput: $input) {
      id
      name
      propertyId
      description
      size
    }
  }
`;
