export const book = (client) => {
  const cache = {};
  return {
    getText(url) {
      if (cache[url]) { 
        return Promise.resolve(cache[url]);
      }
      return client.get(url).then(text => cache[url] = text);
    }
  }
};