import {
  test, describe, beforeEach, afterEach, expect, afterAll,
} from '@jest/globals';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import nock from 'nock';
import replaceLinks from '../src/modules/replacerItems.js';
import createDirName from '../src/modules/workWithNames/createDirName.js';
import createFileName from '../src/modules/workWithNames/createFileName.js';

describe('replaceLinks', () => {
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
  const validLinks = ['/image.png', '/style.css', '/script.js'];

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

  afterEach(() => {
    nock.cleanAll();
  });

  afterAll(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  test('should replace links in the html and save the new html', async () => {
    const outputPath = path.join(tmpDir, 'index.html');
    const htmlAndLinksAndUrlAndTag = [htmlContent, validLinks, url, 'img'];

    await replaceLinks(htmlAndLinksAndUrlAndTag, outputPath);

    const newHtml = await fs.readFile(outputPath, 'utf-8');
    const dirName = createDirName(url);
    const expectedImgPath = path.join(dirName, createFileName(`${url}/image.png`));

    expect(newHtml).toContain(expectedImgPath);
  });

  test('should replace links in the html and save the new html', async () => {
    const outputPath = path.join(tmpDir, 'index.html');
    const htmlAndLinksAndUrlAndTag = [htmlContent, validLinks, url, 'link'];

    await replaceLinks(htmlAndLinksAndUrlAndTag, outputPath);

    const newHtml = await fs.readFile(outputPath, 'utf-8');
    const dirName = createDirName(url);
    const expectedLinkPath = path.join(dirName, createFileName(`${url}/style.css`));

    expect(newHtml).toContain(expectedLinkPath);
  });

  test('sshould replace links in the html and save the new html', async () => {
    const outputPath = path.join(tmpDir, 'index.html');
    const htmlAndLinksAndUrlAndTag = [htmlContent, validLinks, url, 'script'];

    await replaceLinks(htmlAndLinksAndUrlAndTag, outputPath);

    const newHtml = await fs.readFile(outputPath, 'utf-8');
    const dirName = createDirName(url);
    const expectedScriptPath = path.join(dirName, createFileName(`${url}/script.js`));

    expect(newHtml).toContain(expectedScriptPath);
  });
});
