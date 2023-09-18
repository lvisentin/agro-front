import myApolloClient from '@/apollo-client';
import { gql } from '@apollo/client';

class PropertiesService {
  private VERCEL_API_URL = process.env.VERCEL_API_URL;
  private client = myApolloClient;

  async getProperties() {
    const { data } = await this.client.query({
      query: gql`
        query GetProperties {
          _id
          name
          ownerId
        }
      `,
    });
    return data;
  }

  async getPropertyById(id: string) {
    const { data } = await this.client.query({
      query: gql`
        query GetPropertyById {
          _id
          name
          ownerId
        }
      `,
    });
    return data;
  }
}

export const propertiesService = new PropertiesService();
