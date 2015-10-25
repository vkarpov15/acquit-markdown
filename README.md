# acquit-markdown

## It converts acquit output to a simple markdown format


The acquit-markdown plugin adds an output processor to acquit that
transforms acquit's syntax tree output into a markdown string. It
converts mocha descriptions into headers, comments into paragraphs,
and wraps code in backticks.


```javascript

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
  
```

## It can use acquit constructor

```javascript

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
  
```