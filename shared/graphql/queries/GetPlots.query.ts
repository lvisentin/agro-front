import { gql } from '@apollo/client';

export const GetPlotsQuery = gql`
  query getPlots($propertyId:Int) {
    plots(propertyId: $propertyId) {
      id
      name
      farmingType
      property {
        name
        id
      }
      size
    }
  }
`;
