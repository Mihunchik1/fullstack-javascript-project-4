/* eslint-disable consistent-return */
import fs from 'fs/promises';
import path from 'path';
import * as cheerio from 'cheerio';
import createDirName from './workWithNames/createDirName.js';
import downloadItem from './downloaderItem.js';

export default (html, url, dirpath) => {
  const urlHost = new URL(url).host;
  const $ = cheerio.load(html);
  const imgTags = $('img');
  const links = [];

  imgTags.each((index, el) => {
    const src = $(el).attr('src');
    if (src) {
      links.push(src);
    }
  });

  const validLinks = links.length > 0
    ? links.filter((el) => el.includes(urlHost) || el.startsWith('/'))
    : [];

  if (validLinks.length === 0) {
    return;
  }

  const dirName = createDirName(url);
  const outputPath = path.join(dirpath, dirName);

  const processedLinks = validLinks.map((link) => {
    if (link.startsWith('/')) {
      return `${url + link}`;
    }
    return link;
  });

  return fs.mkdir(outputPath, { recursive: true })
    .then(() => processedLinks.map((link) => downloadItem(link, outputPath)))
    .then((downloadPromises) => Promise.all(downloadPromises))
    .then(() => [html, validLinks, url]);
};
