#!/usr/bin/env node

import { program } from 'commander';
import pageLoader from '../src/index.js';

const app = async () => {
  program
    .name('page-loader')
    .description('Page loader utility')
    .version('0.0.1', '-V, --version', 'output the version number')
    .helpOption('-h, --help', 'display help for command')
    .option('-o, --option [dir]', 'output dir', '/home/user/current-dir')
    .arguments('<url>')
    .action((url) => {
      pageLoader(url, program.opts().option);
    });

  program.parse(process.argv);
};

app();
