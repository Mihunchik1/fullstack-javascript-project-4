import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';

export const createFileName = (url) => {
  const urlWithoutProtocol = url.split('//')[1];
  const result = `${urlWithoutProtocol.replace(/[^\w]/g, '-')}.html`;
  return result;
};

export default (url, option = '/home/user/current-dir') => {
  const currentDirectory = process.cwd();
  const fileName = createFileName(url);
  const outputPath = option === '/home/user/current-dir' ? path.join(currentDirectory, fileName) : path.join(option, fileName);
  const dirPath = path.dirname(outputPath);

  return fs.access(dirPath, fs.constants.F_OK)
    .then(() => axios.get(url))
    .then((response) => fs.writeFile(outputPath, response.data))
    .then(() => {
      console.log(outputPath);
    })
    .catch((err) => {
      if (err.code === 'ENOENT') {
        console.error('dir is not exist');
      } else {
        console.error(err);
      }
      return Promise.reject(err);
    });
};
