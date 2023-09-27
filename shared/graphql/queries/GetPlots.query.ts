import { gql } from '@apollo/client';

export const GetPlotsQuery = gql`
  query GetPlots {
    plots {
      id
      name
      description
      property {
        name
      }
      size
    }
  }
`;
