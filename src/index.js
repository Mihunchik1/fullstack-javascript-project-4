import fs from 'fs/promises';
import path from 'path';
import downloadHtml from './modules/downloaderHtml.js';
import downloadImages from './modules/downloaderImages.js';
import createHtmlName from './modules/createHtmlName.js';
// продумать функцию замены (возможно она подойдет и под остальные ресурсы)

export default (url, option = '/home/user/current-dir') => {
  const currentDirectory = process.cwd();
  const htmlName = createHtmlName(url);
  const outputPath = option === '/home/user/current-dir' ? path.join(currentDirectory, htmlName) : path.join(option, htmlName);
  const dirPath = path.dirname(outputPath);

  return downloadHtml(url, option)
    .then(() => fs.readFile(outputPath, 'utf-8'))
    .then((textFile) => downloadImages(textFile, url, dirPath))
    .then(() => console.log(outputPath))
    .catch((err) => Promise.reject(err));
};
