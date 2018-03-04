#!/usr/bin/node

'use strict';

const acquit = require('acquit');
const commander = require('commander');
const fs = require('fs');

commander.
  option('-p, --path [path]', 'File/directory to use').
  option('-r, --require [plugin]', 'Require plugins').
  option('-h, --header [path]', 'Header file').
  option('-i, --it [bool]', 'Whether to prepend "it"').
  parse(process.argv);

if (!commander.path) {
  throw 'Need to set --path!';
}

require('../')(acquit, { it: commander.it ? true : false });

if (commander.require) {
  const plugins = Array.isArray(commander.require) ? commander.require : [commander.require];

  for (const plugin of plugins) {
    require(plugin)();
  }
}

const contents = fs.readFileSync(commander.path).toString();
const header = commander.header ? fs.readFileSync(commander.header, 'utf8') : '';
const markdown = acquit.parse(fs.readFileSync(commander.path, 'utf8'));

console.log(`${header}\n\n${markdown}`);
