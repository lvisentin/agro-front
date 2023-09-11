import { httpClient } from "../httpClient/HttpClient";

class PurchasesService {
  private VERCEL_API_URL = process.env.VERCEL_API_URL;

  async fetchPurchasesList() {
    return await httpClient.get(`${this.VERCEL_API_URL}/purchases`);
  }
}

export const purchasesService = new PurchasesService();
