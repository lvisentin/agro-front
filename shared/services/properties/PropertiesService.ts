import createApolloClient from '@/apollo-client';
import { gql } from '@apollo/client';

class PropertiesService {
  private VERCEL_API_URL = process.env.VERCEL_API_URL;

  async fetchPropertiesList() {
    const client = createApolloClient();
    return await client.query({
      query: gql`
        query GetProperties {
          _id
          name
          ownerId
        }
      `,
    });
  }
}

export const propertiesService = new PropertiesService();
