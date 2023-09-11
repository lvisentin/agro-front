import { httpClient } from "../httpClient/HttpClient";

class PropertiesService {
  private VERCEL_API_URL = process.env.VERCEL_API_URL;

  async fetchPropertiesList() {
    return await httpClient.get(`${this.VERCEL_API_URL}/properties`);
  }
}

export const propertiesService = new PropertiesService();
