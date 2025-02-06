/* eslint-disable no-param-reassign */
import axios from 'axios';
import path from 'path';
import fs from 'fs/promises';
import createFileName from './workWithNames/createFileName.js';
import createHtmlName from './workWithNames/createHtmlName.js';

export default (link, dir) => {
  const extension = path.extname(link);
  let filename = createFileName(link);
  if (extension === '') {
    filename = createHtmlName(link);
    link += '.html';
  }
  const filesExtensions = ['.html', '.js', '.css'];
  if (!filesExtensions.includes(extension)) {
    return axios.get(link, {
      responseType: 'arraybuffer',
    })
      .then((response) => fs.writeFile(path.join(dir, filename), response.data))
      .catch((err) => Promise.reject(err));
  }
  return axios.get(link)
    .then((response) => fs.writeFile(path.join(dir, filename), response.data))
    .catch((err) => Promise.reject(err));
};
