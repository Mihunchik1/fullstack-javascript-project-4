import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import createFileName from './createHtmlName.js';

export default (url, option = '/home/user/current-dir') => {
  const currentDirectory = process.cwd();
  const fileName = createFileName(url);
  const outputPath = option === '/home/user/current-dir' ? path.join(currentDirectory, fileName) : path.join(option, fileName);
  const dirPath = path.dirname(outputPath);

  return fs.access(dirPath, fs.constants.F_OK)
    .then(() => axios.get(url))
    .then((response) => fs.writeFile(outputPath, response.data))
    .catch((err) => Promise.reject(err));
};
