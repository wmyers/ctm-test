const get = (url) => {
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
      
      return resolve(xhr.responseText);
    };
  })
} 

export default {
  get
};