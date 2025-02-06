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
  const linkTags = $('link');

  const urlLinks = [];

  linkTags.each((index, el) => {
    const href = $(el).attr('href');
    if (href) {
      urlLinks.push(href);
    }
  });

  const validUrlLinks = urlLinks.length > 0
    ? urlLinks.filter((el) => el.includes(urlHost) || el.startsWith('/'))
    : [];

  if (!validUrlLinks.length) {
    return;
  }

  const dirName = createDirName(url);
  const outputPath = path.join(dirpath, dirName);

  const processedUrlLinks = validUrlLinks.map((link) => {
    if (link.startsWith('/')) {
      return `${url + link}`;
    }
    return link;
  });

  return fs.access(outputPath)
    .then(() => processedUrlLinks.map((link) => downloadItem(link, outputPath)))
    .catch(() => {
      return fs.mkdir(outputPath, { recursive: true })
        .then(() => processedUrlLinks.map((link) => downloadItem(link, outputPath)));
    })
    .then((downloadPromises) => Promise.all(downloadPromises))
    .then(() => [html, validUrlLinks, url]);
};
