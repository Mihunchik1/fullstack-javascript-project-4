/* eslint-disable no-shadow */
import fs from 'fs/promises';
import path from 'path';
import * as cheerio from 'cheerio';
import createDirName from './workWithNames/createDirName.js';
import downloadItem from './downloaderItem.js';
import { logWorkWithFiles } from '../../logger.js';

export default (html, url, dirpath, tag) => {
  if (!html || !url || !dirpath || !tag) {
    throw new Error('Invalid input data');
  }

  const urlHost = new URL(url).host;
  const $ = cheerio.load(html);

  let attribute;

  const choosenTag = (tag) => {
    const tags = {
      img: 'src',
      link: 'href',
      script: 'src',
    };
    attribute = tags[tag];
  };
  choosenTag(tag);

  const tags = $(tag);
  const links = [];

  tags.each((index, el) => {
    const link = $(el).attr(attribute);
    if (link) {
      links.push(link);
    }
  });

  const validLinks = links.length > 0
    ? links.filter((el) => el.includes(urlHost) || el.startsWith('/'))
    : [];

  if (!validLinks.length) {
    return Promise.resolve([html, [], url]);
  }

  const dirName = createDirName(url);
  const outputPath = path.join(dirpath, dirName);

  const processedLinks = validLinks.map((link) => {
    if (link.startsWith('/')) {
      return `${url + link}`;
    }
    return link;
  });

  return fs.access(outputPath)
    .catch(() => fs.mkdir(outputPath, { recursive: true }))
    .then(() => {
      logWorkWithFiles(`downloadResource: start downloading resource ${tag}`);
      const downloadPromises = processedLinks.map((link) => downloadItem(link, outputPath));
      return Promise.all(downloadPromises);
    })
    .then(() => {
      logWorkWithFiles(`downloadResource: end of downloading resource ${tag}`);
      return [html, validLinks, url, tag];
    })
    .catch((err) => {
      throw new Error(`Failed to download ${tag}s: ${err.message}`);
    });
};
