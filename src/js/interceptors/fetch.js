/* eslint-disable no-param-reassign */
import Api from '../apis/app';

const fetchInterceptor = (fetchContext = global) => {
  const _fetch = fetchContext.fetch;

  return createStore => (reducer, initialState, enhancer) => {
    const store = createStore(reducer, initialState, enhancer);

    fetchContext.fetch = async (url, options) => {
      if (options) {
        options.headers = {
          ...(options.headers || {}),
          ...Api.getAuthHeader()
        };
      }
      const res = await _fetch(url, options);
      return res;
    };

    return store;
  };
};

export default fetchInterceptor;
