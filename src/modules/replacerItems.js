/* eslint-disable no-shadow */
import * as cheerio from 'cheerio';
import path from 'path';
import fs from 'fs/promises';
import createFileName from './workWithNames/createFileName.js';
import createDirName from './workWithNames/createDirName.js';

export default (htmlAndLinksAndUrlAndTag, outputPath) => {
  const [html, validLinks, url, tag] = htmlAndLinksAndUrlAndTag;

  if (!validLinks.length) {
    return Promise.resolve();
  }

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

  const $ = cheerio.load(html);
  let processedLinks = validLinks.map((link) => {
    if (link.startsWith('/')) {
      return `${url}${link}`;
    }
    return link;
  });

  const dirName = createDirName(url);

  processedLinks = processedLinks.map((link) => `${path.join(dirName, createFileName(link))}`);

  $(`${tag}[${attribute}]`).each((index, el) => {
    const attr = $(el).attr(attribute);

    const validLInksIndex = validLinks.indexOf(attr);
    if (validLInksIndex !== -1) {
      $(el).attr(attribute, processedLinks[validLInksIndex]);
    }
  });

  const newHtml = $.html();
  return fs.writeFile(outputPath, newHtml)
    .catch((err) => {
      throw new Error(`Failed to replace ${tag}s: ${err.message}`);
    });
};
