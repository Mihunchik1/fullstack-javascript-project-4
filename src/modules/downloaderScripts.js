/* eslint-disable arrow-body-style */
/* eslint-disable consistent-return */
import fs from 'fs/promises';
import path from 'path';
import * as cheerio from 'cheerio';
import createDirName from './workWithNames/createDirName.js';
import downloadItem from './downloaderItem.js';

export default (html, url, dirpath) => {
  const urlHost = new URL(url).host;

  const $ = cheerio.load(html);
  const scriptTags = $('script');

  const urlScripts = [];

  scriptTags.each((index, el) => {
    const src = $(el).attr('src');
    if (src) {
      urlScripts.push(src);
    }
  });

  const validUrlScripts = urlScripts.length > 0
    ? urlScripts.filter((el) => el.includes(urlHost) || el.startsWith('/'))
    : [];

  if (!validUrlScripts.length) {
    return;
  }

  const dirName = createDirName(url);
  const outputPath = path.join(dirpath, dirName);

  const processedUrlScripts = validUrlScripts.map((link) => {
    if (link.startsWith('/')) {
      return `${url + link}`;
    }
    return link;
  });

  return fs.access(outputPath)
    .then(() => processedUrlScripts.map((link) => downloadItem(link, outputPath)))
    .catch(() => {
      return fs.mkdir(outputPath, { recursive: true })
        .then(() => processedUrlScripts.map((link) => downloadItem(link, outputPath)));
    })
    .then((downloadPromises) => Promise.all(downloadPromises))
    .then(() => [html, validUrlScripts, url]);
};
