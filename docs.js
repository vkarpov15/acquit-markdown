'use strict';

var acquit = require('acquit');
var fs = require('fs');

require('./')();

var content = fs.readFileSync('./test/examples.test.js').toString();

fs.writeFileSync('README.md', acquit.parse(content));
