#!/usr/bin/env node

import { program } from 'commander';
import pageLoader from '../src/index.js';

const app = () => {
  program
    .name('page-loader')
    .description('Page loader utility')
    .version('0.0.1', '-V, --version', 'output the version number')
    .helpOption('-h, --help', 'display help for command')
    .option('-o, --option [dir]', 'output dir', '/home/user/current-dir')
    .arguments('<url>')
    .action((url) => {
      pageLoader(url, program.opts().option)
        .catch((error) => {
          console.error(`Download error: ${error.message} \nCode:${error.code}`);
          process.exit(1);
        });
    });

  program.parse(process.argv);
};

app();
