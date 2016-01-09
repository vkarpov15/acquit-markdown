'use strict';

var acquit = require('acquit');

module.exports = plugin;

function plugin(instance, options) {
  if (instance) {
    instance.output(markdown(options));
  } else {
    acquit.output(markdown(options));
  }
};

plugin.markdown = markdown;

function markdown(options) {
  return function(res) {
    return recurse(res, 0, options);
  };
}

function recurse(blocks, level, options) {
  var str = '';
  var hashes = getHashes(level + 1);
  for (var i = 0; i < blocks.length; ++i) {
    if (blocks[i].contents) {
      str += hashes + ' ' + (blocks[i].type === 'it' ? (!options || !options.it ? 'It ': '') : '') +
        blocks[i].contents;
    }
    str += '\n\n';
    for (var j = 0; j < blocks[i].comments.length; ++j) {
      str += acquit.trimEachLine(blocks[i].comments[j]);
      str += '\n\n';
    }
    if (blocks[i].type === 'describe') {
      str += recurse(blocks[i].blocks, level + 1, options);
    } else {
      str += ['```javascript', blocks[i].code, '```'].join('\n');
    }
    if (i + 1 < blocks.length) {
      str += '\n\n';
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
