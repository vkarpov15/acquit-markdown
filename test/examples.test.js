var acquit = require('acquit');
var assert = require('assert');

describe('acquit-markdown', function() {
  afterEach(function() {
    acquit.removeAllOutputProcessors();
  });

  it('converts acquit output to a simple markdown format', function() {
    var acquit = require('acquit');
    require('acquit-markdown')();

    var code = [
      'describe("My feature", function() {',
      '  /** This is a very important feature */',
      '  describe("My subfeature", function() {',
      '    it("works", function() {',
      '      // code here',
      '    })',
      '  })',
      '})'
    ].join('\n');

    assert.equal(acquit.parse(code), [
      '# My feature',
      '',
      '## My subfeature',
      '',
      'This is a very important feature',
      '',
      '### It works',
      '',
      '```javascript',
      '',
      '      // code here',
      '    ',
      '```'
    ].join('\n'));
  });

  it('can use acquit constructor', function() {
    var acquit = require('acquit')();
    require('acquit-markdown')(acquit);

    var code = [
      'describe("My feature", function() {',
      '  /** This is a very important feature */',
      '  describe("My subfeature", function() {',
      '    it("works", function() {',
      '      // code here',
      '    })',
      '  })',
      '})'
    ].join('\n');

    assert.equal(acquit.parse(code), [
      '# My feature',
      '',
      '## My subfeature',
      '',
      'This is a very important feature',
      '',
      '### It works',
      '',
      '```javascript',
      '',
      '      // code here',
      '    ',
      '```'
    ].join('\n'));
  });
});
