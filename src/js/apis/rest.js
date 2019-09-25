import QueryString from 'qs';

const RestApi = {
  get: (url, params = {}, headers = {}) => {
    const realHeaders = { ...headers };
    const queryString = QueryString.stringify(params, { addQueryPrefix: true });
    const realURL = `${url}${queryString}`;
    return fetch(realURL, {
      method: 'GET',
      mode: 'no-cors',
      headers: realHeaders
    });
  },
  post: (url, params = {}, headers = {}) => {
    const realHeaders = {
      ...headers,
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: realHeaders,
      body: QueryString.stringify(params, { addQueryPrefix: false })
    });
  },
  put: (url, params = {}, headers = {}) => {
    const realHeaders = {
      ...headers,
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return fetch(url, {
      method: 'PUT',
      mode: 'no-cors',
      headers: realHeaders,
      body: QueryString.stringify(params, { addQueryPrefix: false })
    });
  },
  delete: (url, params = {}, headers = {}) => {
    const realHeaders = { ...headers };
    const queryString = QueryString.stringify(params, { addQueryPrefix: true });
    const realURL = `${url}${queryString}`;
    return fetch(realURL, {
      method: 'DELETE',
      mode: 'no-cors',
      headers: realHeaders
    });
  }
};

export default RestApi;
