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

  postFormData(route: string, params: FormData) {
    return fetch(route, {
      method: 'POST',
      body: params,
    }).then((response) => {
      if (response.status !== 200 && response.status !== 201) {
        throw new Error('ocorreu algo');
      }

      return response.json();
    });
  }
}

export const httpClient = new HttpClient();
