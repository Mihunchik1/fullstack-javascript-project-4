/* eslint-disable consistent-return */
import fs from 'fs/promises';
import path from 'path';
import * as cheerio from 'cheerio';
import createDirName from './createDirName.js';
import downloadImage from './downloaderImage.js';

export default (html, url, dirpath) => {
  const urlHost = new URL(url).host;
  html = `<html lang="ru">
  <head>
    <meta charset="utf-8">
    <title>Курсы по программированию Хекслет</title>
  </head>
  <body>
    <img src="/assets/professions/nodejs.png" alt="Иконка профессии Node.js-программист" />
    <img src="https://i.postimg.cc/ncTCTjzC/Yy4e-YUYQo-DU.jpg" alt="Иконка профессии Node.js-программист" />
    <img src="https://example.com/assets/professions/python.png" alt="Иконка профессии Node.js-программист" />
    <h3>
      <a href="/professions/nodejs">Node.js-программист</a>
    </h3>
  </body>
</html>`;
  const $ = cheerio.load(html);
  const imgTags = $('img');
  const links = [];

  imgTags.each((index, el) => {
    links.push($(el).attr('src'));
  });
  let validLinks = links.filter((el) => el.includes(urlHost) || el.startsWith('/'));

  if (validLinks.length === 0) {
    // eslint-disable-next-line no-useless-return
    return;
  }

  const dirName = createDirName(url);
  const outputPath = path.join(dirpath, dirName);

  validLinks = validLinks.map((link) => {
    if (link.startsWith('/')) {
      return `${url}${link}`;
    }
    return link;
  });

  return fs.mkdir(outputPath, { recursive: true })
    .then(() => validLinks.map((link) => downloadImage(link, outputPath)))
    .then((downloadPromises) => Promise.all(downloadPromises));
};
