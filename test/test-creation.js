/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('d generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('d:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      '.gitignore',
      '.npmignore',
      '.travis.yml',
      '.jshintrc',
      '.editorconfig',
      'Makefile',
      'README.md',
      'HISTORY.md',
      'index.js',
      'test/index.js',
      'package.json'
    ];

    helpers.mockPrompt(this.app, {
      'name': 'mymodule',
      'description': 'awesome module',
      'license': 'MIT'
    });

    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});
