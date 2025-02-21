/* eslint-disable no-param-reassign */
import fs from 'fs/promises';
import path from 'path';
import Listr from 'listr';
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

  const tasks = new Listr([
    {
      title: 'Downloading HTML',
      task: () => downloadHtml(url, outputPath, dirPath),
    },
    {
      title: 'Processing images',
      task: () => fs.readFile(outputPath, 'utf-8')
        .then((html) => downloaderResource(html, url, dirPath, 'img'))
        .then((htmlAndLinksAndUrlAndTag) => replaceItems(htmlAndLinksAndUrlAndTag, outputPath)),
    },
    {
      title: 'Processing CSS links',
      task: () => fs.readFile(outputPath, 'utf-8')
        .then((html) => downloaderResource(html, url, dirPath, 'link'))
        .then((htmlAndLinksAndUrlAndTag) => replaceItems(htmlAndLinksAndUrlAndTag, outputPath)),
    },
    {
      title: 'Processing scripts',
      task: () => fs.readFile(outputPath, 'utf-8')
        .then((html) => downloaderResource(html, url, dirPath, 'script'))
        .then((htmlAndLinksAndUrlAndTag) => replaceItems(htmlAndLinksAndUrlAndTag, outputPath)),
    },
    {
      title: 'Successful!',
      task: () => console.log(outputPath),
    },
  ]);

  return tasks.run()
    .catch((err) => {
      throw err;
    });
};
