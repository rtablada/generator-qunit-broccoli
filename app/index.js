const util = require('util');
const path = require('path');
const _ = require('lodash');
const utils = require('keystone-utils');
const yeoman = require('yeoman-generator');
const wiring = require('html-wiring');

const ProjectGenerator = module.exports = function ProjectGenerator(args, options, config) {
  // Set utils for use in templates
  this.utils = utils;

  // Apply the Base Generator
  yeoman.generators.Base.apply(this, arguments);

  this.argument('projectName', { type: String, required: false });

  // Welcome
  console.log('\nWelcome to your new QUnit Project.\n');

  // Import Package.json
  this.pkg = JSON.parse(wiring.readFileAsString(path.join(__dirname, '../package.json')));
};

// Extends the Base Generator
util.inherits(ProjectGenerator, yeoman.generators.Base);

ProjectGenerator.prototype.prompts = function prompts() {
  const cb = this.async();

  const prompts = {

    project: [
    ],

    config: [],

  };

  if (!this.projectName) {
    prompts.project = [
      {
        name: 'projectName',
        message: 'What is the name of your project?',
        default: 'My Site',
      }, {
        type: 'confirm',
        name: 'newDirectory',
        message: 'Would you like to create a new directory for your project?',
        default: true,
      },
    ];
  } else {
    this.newDirectory = true;
  }

  this.prompt(prompts.project, (props) => {
    _.each(props, function (val, key) {
      this[key] = val;
    }, this);

    // Keep an unescaped version of the project name
    this._projectName = this.projectName;

    // Create the directory if required
    if (this.newDirectory) {
      this.destinationRoot(utils.slug(this.projectName));
    }

    if (!prompts.config.length) {
      return cb();
    }
  });
};

ProjectGenerator.prototype.project = function project() {
  const copyDir = [
    'tests',
    'app',
    'server',
  ];
  const _this = this;

  this.template('_package.json', 'package.json');
  this.template('_.sass-lint.yml', '.sass-lint.yml');
  this.template('public/index.html', 'public/index.html');
  this.copy('Brocfile.js', 'Brocfile.js');
  this.copy('testem.json', 'testem.json');
  this.copy('_.babelrc', '.babelrc');
  this.copy('_.editorconfig', '.editorconfig');
  this.copy('_.env', '.env');
  this.copy('_.eslintrc.js', '.eslintrc.js');
  this.copy('_.gitignore', '.gitignore');

  copyDir.forEach((file) => {
    _this.bulkDirectory(file, file);
  });

  // This callback is fired when the generator has completed,
  // and includes instructions on what to do next.
  const done = _.bind(function done() {
    this.composeWith('git-init', {
      options: { commit: 'Generated Broccoli Asset Project' }
    }, {
      local: require.resolve('generator-git-init')
    });

    console.log(
    '\n------------------------------------------------' +
    '\n' +
    '\nYour QUnit project is ready to go!' +
    '\n' +
    '\nTo get started:' +
    '\n npm start' +
    '\n' +
    '\nTo get testing:' +
    '\n npm test');
  }, this);

  const yarn = this.spawnCommand('yarn', []);

  yarn.on('close', done);
};
