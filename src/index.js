import axios from "axios";
import fs from 'fs';

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
      fs.writeFile(fileName, data, () => {
        console.log(fileName)
      });
    })
    .catch((rej) => {
      console.log(rej)
    });
}