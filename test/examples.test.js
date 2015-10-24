var acquit = require('acquit');
var assert = require('assert');

describe('acquit-markdown', function() {
  afterEach(function() {
    acquit.removeAllOutputProcessors();
  });

  /**
   * The acquit-markdown plugin adds an output processor to acquit that
   * transforms acquit's syntax tree output into a markdown string. It
   * converts mocha descriptions into headers, comments into paragraphs,
   * and wraps code in backticks.
   */
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
