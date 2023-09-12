import { httpClient } from "../httpClient/HttpClient";

class ProductsService {
  private VERCEL_API_URL = process.env.VERCEL_API_URL;

  async fetchProductsList() {
    return await httpClient.get(`${this.VERCEL_API_URL}/products`);
  }
}

export const productsService = new ProductsService();
