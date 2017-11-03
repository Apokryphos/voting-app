function mockFetch(data) {
  const response = {
    json: () => data,
  };

  return () => new Promise((resolve, reject) => resolve(response));
}

module.exports = mockFetch;
