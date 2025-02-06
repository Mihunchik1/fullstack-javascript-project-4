import * as cheerio from 'cheerio';
import path from 'path';
import fs from 'fs/promises';
import createFileName from './workWithNames/createFileName.js';
import createDirName from './workWithNames/createDirName.js';

export default (htmlAndLinksAndUrl, outputPath) => {
  let html;
  let validLinks;
  let url;

  if (htmlAndLinksAndUrl) {
    [html, validLinks, url] = htmlAndLinksAndUrl; // если чего то нет то вылетит undefined
  }
  const $ = cheerio.load(html);
  let processedLinks = validLinks.map((link) => {
    if (link.startsWith('/')) {
      return `${url}${link}`;
    }
    return link;
  });

  const dirName = createDirName(url);

  processedLinks = processedLinks.map((link) => `${path.join(dirName, createFileName(link))}`);

  $('script[src]').each((index, el) => {
    const src = $(el).attr('src');

    const validLInksIndex = validLinks.indexOf(src);
    if (validLInksIndex !== -1) {
      $(el).attr('src', processedLinks[validLInksIndex]);
    }
  });

  const newHtml = $.html();
  return fs.writeFile(outputPath, newHtml)
    .catch((err) => Promise.reject(err));
};
