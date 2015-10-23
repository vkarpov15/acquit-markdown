'use strict';

var acquit = require('acquit');

module.exports = plugin;

function plugin(instance) {
  if (instance) {
    instance.output(markdown);
  } else {
    acquit.output(markdown);
  }
};

plugin.markdown = markdown;

function markdown(res) {
  return recurse(res, 0);
}

function recurse(blocks, level) {
  var str = '';
  var hashes = getHashes(level + 1);
  for (var i = 0; i < blocks.length; ++i) {
    str += hashes + ' ' + (blocks[i].type === 'it' ? 'It ' : '') +
      blocks[i].contents;
    str += '\n\n';
    for (var j = 0; j < blocks[i].comments.length; ++j) {
      str += acquit.trimEachLine(blocks[i].comments[j]);
      str += '\n\n';
    }
    if (blocks[i].type === 'describe') {
      str += recurse(blocks[i].blocks, level + 1);
    } else {
      str += ['```javascript', blocks[i].code, '```'].join('\n');
    }
  }
  return str;
}

function getHashes(level) {
  var str = '';
  for (var i = 0; i < level; ++i) {
    str += '#';
  }
  return str;
}
