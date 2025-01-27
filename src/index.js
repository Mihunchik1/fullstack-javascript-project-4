import axios from "axios";
import fs from 'fs/promises';

const createFileName = (url) => {
  const urlWithoutProtocol = url.split('//')[1];
  const result = urlWithoutProtocol.replace(/[^\w]/g, '-') + '.html';
  return result;
}

export default (url, option = '/home/user/current-dir') => {
  const promise = new Promise((resolve, reject) => {
    axios.get(url)
      .then((response) => {
        resolve(response.data);
      });
  });

  const currentDirectory = process.cwd();

  const fileName = createFileName(url);

  if (option === '/home/user/current-dir') {
    option = '/';
  }
  else {
    option = option + '/'
  }
  const path = currentDirectory + option + fileName;
  
  promise
    .then((data) => {
      return fs.writeFile(path, data);
    })
    .then(() => {
      console.log(path);
    })
    .catch((rej) => {
      console.log(rej)
    });
}