import axios from 'axios';
import path from 'path';
import fs from 'fs/promises';
import createImageName from './createImageName.js';

export default (link, dir) => {
  link = 'https://i.postimg.cc/ncTCTjzC/Yy4e-YUYQo-DU.jpg';
  const filename = createImageName(link);
  return axios.get(link, {
    responseType: 'arraybuffer',
  })
    .then((response) => fs.writeFile(path.join(dir, filename), response.data));
};
