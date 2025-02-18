import fs from 'fs/promises';
import { log, axios } from '../../logger.js';

export default (url, outputPath, dirPath) => fs.access(dirPath, fs.constants.F_OK)
  .then(() => {
    log(`download html: start getting ${url}`);
    return axios.get(url);
  })
  .then((response) => {
    log(`download html: end of getting ${url}`);
    return fs.writeFile(outputPath, response.data);
  })
  .catch((err) => {
    throw new Error(`Failed to download HTML: ${err.message}`);
  });
