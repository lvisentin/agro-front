import { gql } from '@apollo/client';

export const DeletePlotMutation = gql`
  mutation DeletePlot($id: Int!) {
    deletePlot(id: $id) {
      id
    }
  }
`;
