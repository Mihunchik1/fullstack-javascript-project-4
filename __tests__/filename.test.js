import { test, expect } from '@jest/globals';
import { createFileName } from '../src/index.js';

test('proper file name change', () => {
  const url = 'https://example.com';
  const newFilename = 'example-com.html';
  expect(createFileName(url)).toEqual(newFilename);
});
