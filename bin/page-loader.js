#!/usr/bin/env node

import { program } from 'commander';

const app = () => {
  program
    .name('page-loader')
    .description('Page loader utility')
    .version('0.0.1', '-V, --version', 'output the version number')
    .helpOption('-h, --help', 'display help for command')
    .option('-o, --option [dir]', 'output dir', '/home/user/current-dir')
    .arguments('<url>')
    .action((url) => {
      console.log(program.opts().option);
    });

  program.parse(process.argv);
};

app();