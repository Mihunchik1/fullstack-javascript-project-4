import {
  test, expect, beforeAll, afterAll, describe,
} from '@jest/globals';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import nock from 'nock';
import pageLoader from '../src/index.js';
import createHtmlName from '../src/modules/workWithNames/createHtmlName.js';
import downloaderHtml from '../src/modules/downloaderHtml.js';

describe('file is downloaded', () => {
  let tempDir;
  const url = 'https://example.com';
  const testData = '<html><head></head><body>example</body></html>';

  beforeAll(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'page-loader-'));

    nock('https://example.com')
      .get('/')
      .reply(200, testData);
  });

  test('file has been created and the content matches', async () => {
    await pageLoader(url, tempDir);

    const fileName = createHtmlName(url);
    const outputPath = path.join(tempDir, fileName);

    const fileExists = await fs.access(outputPath).then(() => true).catch(() => false);
    expect(fileExists).toBe(true);

    const fileContent = await fs.readFile(outputPath, 'utf-8');
    expect(fileContent).toBe(testData);
  });

  test('invalid url', async () => {
    const badUrl = 'fnkefs';
    await expect(pageLoader(badUrl, tempDir)).rejects.toThrow('Invalid url');
  });

  test('invalid options: no such file or directory', async () => {
    await expect(pageLoader(url, '/undefinedDirectory')).rejects.toThrow();
  });

  afterAll(async () => {
    await fs.rmdir(tempDir, { recursive: true });

    nock.cleanAll();
  });
});

test('downloader html get invalid url', async () => {
  const badUrl = 'hawdohoawd';
  await expect(downloaderHtml(badUrl, 'path', 'path')).rejects.toThrow();
});
