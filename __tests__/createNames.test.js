import { test, expect } from '@jest/globals';
import createHtmlName from '../src/modules/workWithNames/createHtmlName.js';
import createDirName from '../src/modules/workWithNames/createDirName.js';
import createFileName from '../src/modules/workWithNames/createFileName.js';

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
  expect(createFileName(imageName)).toEqual(result);
});

test('should throw error invalid input', () => {
  const emptyUrl = '';
  expect(() => createFileName(emptyUrl)).toThrow('Invalid URL');
});
