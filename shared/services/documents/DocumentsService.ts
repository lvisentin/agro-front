import { httpClient } from "../httpClient/HttpClient";

class DocumentsService {
  private VERCEL_API_URL = process.env.VERCEL_API_URL;

  async fetchDocuments() {
    return await httpClient.get(`${this.VERCEL_API_URL}/documents`);
  }
}

export const documentsService = new DocumentsService();
