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
  option('-c, --code [bool]', 'Whether to add code to docs').
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

const header = commander.header ? fs.readFileSync(commander.header, 'utf8') : '';
let markdown = '';

if (fs.statSync(commander.path).isDirectory()) {
  const getFiles = (dir, files_) => {
    files_ = files_ || [];
    const files = fs.readdirSync(dir);
    for (const i in files){
      const name = dir + '/' + files[i];
      if (fs.statSync(name).isDirectory()){
        getFiles(name, files_);
      } else {
        files_.push(name);
      }
    }
    return files_;
  };

  getFiles(commander.path).forEach(file => {
    markdown += acquit.parse(fs.readFileSync(file, 'utf8'));
  });
} else {
  markdown = acquit.parse(fs.readFileSync(commander.path, 'utf8'));
}

markdown = markdown.replace(/eslint-\S*/g, '').replace(/TODO[\s\S]*$/g, '');

console.log(`${header ? `${header}\n\n`: ''}${markdown}`);
