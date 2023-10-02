import { gql } from '@apollo/client';

export const GetPropertiesQuery = gql`
  query getProperties {
    properties {
      id
      name
      farmer
      description
      size
      createdAt
      updatedAt
    }
  }
`;
