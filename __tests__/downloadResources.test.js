/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import {
  test, describe, beforeEach, expect, afterAll,
} from '@jest/globals';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import nock from 'nock';
import downloadResources from '../src/modules/downloaderResource.js';
import createDirName from '../src/modules/workWithNames/createDirName.js';
import createFileName from '../src/modules/workWithNames/createFileName.js';

describe('downloadResources', () => {
  let tmpDir;
  const url = 'http://example.com';
  const htmlContent = `
    <html>
      <body>
        <img src="/image.png" alt="Image">
        <link href="/style.css" rel="stylesheet">
        <script src="/script.js"></script>
      </body>
    </html>
  `;

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'page-loader-'));

    nock(url)
      .get('/')
      .reply(200, htmlContent)
      .get('/image.png')
      .reply(200, 'image content')
      .get('/style.css')
      .reply(200, 'css content')
      .get('/script.js')
      .reply(200, 'js content');
  });

  afterAll(async () => {
    await fs.rm(tmpDir.split('/')[1], { recursive: true, force: true });
    nock.cleanAll();
  });

  test('should download all resources and save them to the correct directory', async () => {
    const option = path.join(process.cwd(), tmpDir);
    await downloadResources(htmlContent, url, option, 'img');
    await downloadResources(htmlContent, url, option, 'link');
    await downloadResources(htmlContent, url, option, 'script');

    const dirName = createDirName(url);

    const files = ['image.png', 'style.css', 'script.js'];
    for (const file of files) {
      const outputPath = path.join(process.cwd(), tmpDir, dirName, `${createFileName(url).split('.')[0]}-com-${file}`);
      const fileExists = await fs.access(outputPath).then(() => true).catch(() => false);
      expect(fileExists).toBe(true);
    }
  });
});
