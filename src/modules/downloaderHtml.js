import axios from 'axios';
import fs from 'fs/promises';

export default (url, outputPath, dirPath) => fs.access(dirPath, fs.constants.F_OK)
  .then(() => axios.get(url))
  .then((response) => fs.writeFile(outputPath, response.data))
  .catch((err) => {
    throw new Error(`Failed to download HTML: ${err.message}`);
  });
