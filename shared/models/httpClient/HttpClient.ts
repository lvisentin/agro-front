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
      headers: {
        Authorization:`Bearer ${localStorage.getItem('authorization')}`
      }
    }).then(async (response) => {
      const responseJson = await response.json();
      console.log(responseJson)
      if (response.status !== 200 && response.status !== 201) {
        throw responseJson;
      }

      return responseJson;
    });
  }
}

export const httpClient = new HttpClient();
