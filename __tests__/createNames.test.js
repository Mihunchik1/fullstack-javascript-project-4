import { test, expect } from '@jest/globals';
import createHtmlName from '../src/modules/createHtmlName.js';
import createDirName from '../src/modules/createDirName.js';
import createImageName from '../src/modules/createImageName.js';

const url = 'https://example.com';

test('proper html name change', () => {
  const htmlName = 'example-com.html';
  expect(createHtmlName(url)).toEqual(htmlName);
});

test('proper dirname change', () => {
  const dirName = 'example-com_files';
  expect(createDirName(url)).toEqual(dirName);
});

test('proper image name change', () => {
  const imageName = 'https://i.postimg.cc/ncTCTjzC/Yy4e-YUYQo-DU.jpg';
  const result = 'i-postimg-cc-ncTCTjzC-Yy4e-YUYQo-DU.jpg';
  expect(createImageName(imageName)).toEqual(result);
});
