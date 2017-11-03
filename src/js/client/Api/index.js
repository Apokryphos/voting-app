import 'whatwg-fetch';

module.exports = (function Api() {
  function getApiEndpoint() {
    switch (process.env.NODE_ENV) {
      //  Defined by Webpack
      case 'production':
        throw new Error('No production API specified for environment.');
      default:
        return 'http://localhost:3000/api';
    }
  }

  function getPolls() {
    const endpoint = `${getApiEndpoint()}/polls`;

    const init = {
      method: 'GET',
      mode: 'cors',
      cache: 'default',
    };

    return fetch(endpoint, init).then(response => response.json());
  }

  return {
    getPolls,
  };
}());
