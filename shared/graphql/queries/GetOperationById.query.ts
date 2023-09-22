import { gql } from '@apollo/client';

export const GetOperationByIdQuery = gql`
  query GetOperationById($id: Int!) {
    operation(id: $id) {
        name
        date
        product
        costPerPlot
        costPerHa
        unityCost
        productType
        unity
        dose
        plot
      }
  }
`;
