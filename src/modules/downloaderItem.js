/* eslint-disable no-param-reassign */
import axios from 'axios';
import path from 'path';
import fs from 'fs/promises';
import createFileName from './workWithNames/createFileName.js';
import createHtmlName from './workWithNames/createHtmlName.js';

export default (link, dir) => {
  if (!link || !dir) {
    throw new Error('Invalid input data');
  }
  const extension = path.extname(link);
  let filename = createFileName(link);
  if (extension === '') {
    filename = createHtmlName(link);
  }
  const filesExtensions = ['.html', '.js', '.css'];
  console.log(link);
  if (!filesExtensions.includes(extension)) {
    return axios.get(link, {
      responseType: 'arraybuffer',
    })
      .then((response) => fs.writeFile(path.join(dir, filename), response.data))
      .catch((err) => Promise.reject(err));
  }
  return axios.get(link, {
    responseType: 'arraybuffer',
  })
    .then((response) => fs.writeFile(path.join(dir, filename), response.data))
    .catch((err) => {
      throw new Error(`Failed to download ${link}: ${err.message}`);
    });
};
