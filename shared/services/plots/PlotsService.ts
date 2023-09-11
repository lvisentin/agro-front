import { httpClient } from "../httpClient/HttpClient";

class PlotsService {
  private VERCEL_API_URL = process.env.VERCEL_API_URL;

  async fetchPlotsList() {
    return await httpClient.get(`${this.VERCEL_API_URL}/plots`);
  }
}

export const plotsService = new PlotsService();
