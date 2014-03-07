'use strict';

var path = require('path');
var yeoman = require('yeoman-generator');

var SelfGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    var prompts = [{
      name: 'name',
      message: 'Module Name',
      default: path.basename(process.cwd())
    }, {
      name: 'description',
      message: 'Description',
      default: 'The best module ever.'
    }, {
      name: 'homepage',
      message: 'Repo\'s homepage'
    }, {
      name: 'license',
      message: 'License',
      default: 'MIT'
    }, {
      name: 'user',
      message: 'Author\'s name',
      default: this.user.git.username || ''
    }, {
      name: 'email',
      message: 'Author\'s email',
      default: this.user.git.email || ''
    }, {
      type: 'confirm',
      name: 'hasBin',
      message: 'Do you want bin directory?',
      default: false
    }];

    this.currentYear = new Date().getFullYear();

    this.prompt(prompts, function (props) {


      if (props.user) {
        this.repoUrl = 'https://github.com/' + props.user + '/' + props.name;
      } else {
        this.repoUrl = '';
      }

      if (!props.homepage) {
        this.homepage = this.repoUrl;
      }

      this.props = props;

      done();
    }.bind(this));
  },

  test: function() {
    this.mkdir('test');
    this.template('test/index.js');
  },

  jsFile: function() {
    if (this.props.hasBin) {
      this.mkdir('bin');
      this.template('bin/name', 'bin/' + this.props.name || 'name');
    }

    this.template('index.js');
  },

  projectfiles: function () {
    this.copy('jshintrc', '.jshintrc');
    this.copy('gitignore', '.gitignore');
    this.copy('npmignore', '.npmignore');
    this.copy('editorconfig', '.editorconfig');
    this.copy('travis.yml', '.travis.yml');

    this.template('README.md');
    this.template('HISTORY.md');
    this.template('Makefile');
    this.template('package', 'package.json');
  }
});

module.exports = SelfGenerator;
