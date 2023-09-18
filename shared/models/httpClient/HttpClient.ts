class HttpClient {
  async get(route: string, params: string = '') {
    const response = await fetch(route, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.json();
  }
}

export const httpClient = new HttpClient();
