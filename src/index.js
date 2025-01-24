import axios from "axios";
import fs from 'fs/promises';

const createFileName = (url) => {
  const urlWithoutProtocol = url.split('//')[1];
  const result = urlWithoutProtocol.replace(/[^\w]/g, '-') + '.html';
  return result;
}

export default (url) => {
  const promise = new Promise((resolve, reject) => {
    axios.get(url)
      .then((response) => {
        resolve(response.data);
      });
  });

  const fileName = createFileName(url);

  promise
    .then((data) => {
      return fs.writeFile(fileName, data);
    })
    .then(() => {
      console.log(fileName);
    })
    .catch((rej) => {
      console.log(rej)
    });
}