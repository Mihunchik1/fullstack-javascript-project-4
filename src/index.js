import fs from 'fs/promises';
import path from 'path';
import downloadHtml from './modules/downloaderHtml.js';
import downloaderResource from './modules/downloaderResource.js';
import createHtmlName from './modules/workWithNames/createHtmlName.js';
import replaceItems from './modules/replacerItems.js';
import isValidUrl from './modules/validUrl.js';

export default (url, option = '/home/user/current-dir') => {
  if (!isValidUrl(url)) {
    return Promise.reject(new Error('Invalid url'));
  }
  const currentDirectory = process.cwd();
  const htmlName = createHtmlName(url);
  const outputPath = option === '/home/user/current-dir' ? path.join(currentDirectory, htmlName) : path.join(option, htmlName);
  const dirPath = path.dirname(outputPath);

  return downloadHtml(url, outputPath, dirPath)
    .then(() => fs.readFile(outputPath, 'utf-8'))
    .then((html) => downloaderResource(html, url, dirPath, 'img'))
    .then((htmlAndLinksAndUrlAndTag) => replaceItems(htmlAndLinksAndUrlAndTag, outputPath))
    .then(() => fs.readFile(outputPath, 'utf-8'))
    .then((html) => downloaderResource(html, url, dirPath, 'link'))
    .then((htmlAndLinksAndUrlAndTag) => replaceItems(htmlAndLinksAndUrlAndTag, outputPath))
    .then(() => fs.readFile(outputPath, 'utf-8'))
    .then((html) => downloaderResource(html, url, dirPath, 'script'))
    .then((htmlAndLinksAndUrlAndTag) => replaceItems(htmlAndLinksAndUrlAndTag, outputPath))
    .then(() => console.log(outputPath))
    .catch((err) => {
      throw err;
    });
};
