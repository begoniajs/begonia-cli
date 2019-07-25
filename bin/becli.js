#!/usr/bin/env node
const commander = require('commander');
const setupUIServer = require('../server/server');

console.log('begonia-cli is run', process.argv);

const program = new commander.Command();

program.version('0.0.1');

program
  .command('ui')
  .action(function() {
    setupUIServer();
  });

program.parse(process.argv);

module.exports = {};
