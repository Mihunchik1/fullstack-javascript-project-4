import axios from 'axios';
import fs from 'fs/promises';

export default (url, outputPath, dirPath) => {
  if (!url || !outputPath || !dirPath) {
    throw new Error('Invalid input data');
  }
  return fs.access(dirPath, fs.constants.F_OK)
    .then(() => axios.get(url))
    .then((response) => fs.writeFile(outputPath, response.data))
    .catch((err) => {
      throw new Error(`Failed to download HTML: ${err.message}`);
    });
};
