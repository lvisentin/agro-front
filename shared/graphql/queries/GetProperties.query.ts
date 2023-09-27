import { gql } from '@apollo/client';

export const GetPropertiesQuery = gql`
  query getProperties {
    properties {
      id
      name
      description
      size
      createdAt
      updatedAt
    }
  }
`;
