import config from '../config';

export default function fetchApi(path = '', options = {}) {
  return fetch(config.apiEndpoint + path, options);
}
