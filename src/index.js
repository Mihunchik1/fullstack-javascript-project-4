import fs from 'fs/promises';
import path from 'path';
import downloadHtml from './modules/downloaderHtml.js';
import downloadImages from './modules/downloaderImages.js';
import createHtmlName from './modules/workWithNames/createHtmlName.js';
import imageReplacement from './modules/imageReplacement.js';
import downloaderLinks from './modules/downloaderLinks.js';

export default (url, option = '/home/user/current-dir') => {
  const currentDirectory = process.cwd();
  const htmlName = createHtmlName(url);
  const outputPath = option === '/home/user/current-dir' ? path.join(currentDirectory, htmlName) : path.join(option, htmlName);
  const dirPath = path.dirname(outputPath);

  return downloadHtml(url, option)
    .then(() => fs.readFile(outputPath, 'utf-8'))
    .then((html) => downloadImages(html, url, dirPath))
    .then((htmlAndLinksAndUrl) => imageReplacement(htmlAndLinksAndUrl, outputPath))
    .then(() => fs.readFile(outputPath, 'utf-8'))
    .then((html) => downloaderLinks(html, url, dirPath))
    .then(() => console.log(outputPath))
    .catch((err) => Promise.reject(err));
};
