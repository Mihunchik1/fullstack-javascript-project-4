import fs from 'fs/promises';
import path from 'path';
import downloadHtml from './modules/downloaderHtml.js';
import downloaderImages from './modules/downloaderImages.js';
import createHtmlName from './modules/workWithNames/createHtmlName.js';
import imagesReplacement from './modules/imagesReplacement.js';
import downloaderLinks from './modules/downloaderLinks.js';
import linksReplacement from './modules/linksReplacement.js';
import downloaderScripts from './modules/downloaderScripts.js';
import scriptsReplacement from './modules/scriptsReplacement.js';

export default (url, option = '/home/user/current-dir') => {
  const currentDirectory = process.cwd();
  const htmlName = createHtmlName(url);
  const outputPath = option === '/home/user/current-dir' ? path.join(currentDirectory, htmlName) : path.join(option, htmlName);
  const dirPath = path.dirname(outputPath);

  return downloadHtml(url, option)
    .then(() => fs.readFile(outputPath, 'utf-8'))
    .then((html) => downloaderImages(html, url, dirPath))
    .then((htmlAndLinksAndUrl) => imagesReplacement(htmlAndLinksAndUrl, outputPath))
    .then(() => fs.readFile(outputPath, 'utf-8'))
    .then((html) => downloaderLinks(html, url, dirPath))
    .then((htmlAndLinksAndUrl) => linksReplacement(htmlAndLinksAndUrl, outputPath))
    .then(() => fs.readFile(outputPath, 'utf-8'))
    .then((html) => downloaderScripts(html, url, dirPath))
    .then((htmlAndLinksAndUrl) => scriptsReplacement(htmlAndLinksAndUrl, outputPath))
    .then(() => console.log(outputPath))
    .catch((err) => Promise.reject(err));
};
