import { test, expect, beforeAll, afterAll, describe } from '@jest/globals';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import nock from 'nock';
import pageLoader, { createFileName } from '../src/index.js';

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

    const fileName = createFileName(url);
    const outputPath = path.join(tempDir, fileName);

    const fileExists = await fs.access(outputPath).then(() => true).catch(() => false);
    expect(fileExists).toBe(true);

    const fileContent = await fs.readFile(outputPath, 'utf-8');
    expect(fileContent).toBe(testData);
  });

  afterAll(async () => {
    await fs.rmdir(tempDir, { recursive: true });

    nock.cleanAll();
  });
});
