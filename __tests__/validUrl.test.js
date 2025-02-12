import { test, expect } from '@jest/globals';
import validUrl from '../src/modules/validUrl.js';

test('validate url', () => {
  const badUrl = 'dfladlmaf';
  const correctUrl = 'https://example.com';

  expect(validUrl(badUrl)).toBe(false);
  expect(validUrl(correctUrl)).toBe(true);
});
