import { httpClient } from "../httpClient/HttpClient";

class OperationsService {
  private VERCEL_API_URL = process.env.VERCEL_API_URL;

  async fetchOperationsList() {
    return await httpClient.get(`${this.VERCEL_API_URL}/operations`);
  }
}

export const operationsService = new OperationsService();
