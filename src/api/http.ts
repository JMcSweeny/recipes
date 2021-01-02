interface RequestOptions {
  method: 'GET' | 'POST';
  body?: any;
  bearerToken?: string;
}

const request = async <T>(url: string, options: RequestOptions): Promise<T> => {
  const response = await fetch(url,{
    method: options.method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': options.bearerToken ? `Bearer ${options.bearerToken}` : undefined
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
    credentials: 'include'
  });

  if (!response.ok) {
    throw response;
  }

  return response.json();
};

interface Options {
  bearerToken?: string;
}

interface PostOptions extends Options {
  body?: any;
}

export const get = <T>(url: string, options: Options = {}): Promise<T> => {
  return request(url, {
    method: 'GET',
    bearerToken: options.bearerToken
  });
};

export const post = <T>(url: string, options: PostOptions = {}): Promise<T> => {
  return request(url, {
    method: 'POST',
    bearerToken: options.bearerToken,
    body: options.body
  });
};