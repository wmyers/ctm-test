const cache = {};

const getText = (url) => {
  if (cache[url]) {
    return Promise.resolve(cache[url]);
  }

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true);
    xhr.withCredentials = true;
    xhr.send(null);
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4 ) { return }

      if (xhr.status !== 200) { 
        return reject('Error: ' + xhr.status) 
      }

      cache[url] = xhr.responseText;
      return resolve(xhr.responseText);
    };
  })
}

export default {
  getText
};

