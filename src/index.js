import axios from "axios";
import fs from 'fs/promises';
import path from "path";

const createFileName = (url) => {
  const urlWithoutProtocol = url.split('//')[1];
  const result = urlWithoutProtocol.replace(/[^\w]/g, '-') + '.html';
  return result;
}

export default (url, option = '/home/user/current-dir') => {

  const promise = axios.get(url)
    .then(response => response.data)
    .catch(error => {
      console.error(error);
    });

  const currentDirectory = process.cwd();
  const fileName = createFileName(url);

  const outputPath = option === '/home/user/current-dir' ? path.join(currentDirectory, fileName) : path.join(currentDirectory + option, fileName);
  
  promise
    .then((data) => {
      return fs.writeFile(outputPath, data);
    })
    .then(() => {
      console.log(outputPath);
    })
    .catch((error) => {
      console.error(error);
    });
}