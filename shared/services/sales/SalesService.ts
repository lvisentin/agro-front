import { httpClient } from "../httpClient/HttpClient";

class SalesService {
  private VERCEL_API_URL = process.env.VERCEL_API_URL;

  async fetchSalesList() {
    return await httpClient.get(`${this.VERCEL_API_URL}/sales`);
  }
}

export const salesService = new SalesService();
