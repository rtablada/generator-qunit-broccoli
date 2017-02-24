const util = require('util');
const path = require('path');
const _ = require('lodash');
const utils = require('keystone-utils');
const i = require('i')();
const yeoman = require('yeoman-generator');
const wiring = require('html-wiring');

const ProjectGenerator = module.exports = function ProjectGenerator(args, options, config) {
  // Set utils for use in templates
  this.utils = utils;

  // Apply the Base Generator
  yeoman.generators.Base.apply(this, arguments);

  this.argument('moduleName', { type: String, required: false });

  // Welcome
  console.log('\nWelcome to your new QUnit Project.\n');

  // Import Package.json
  this.pkg = JSON.parse(wiring.readFileAsString(path.join(__dirname, '../package.json')));
};

// Extends the Base Generator
util.inherits(ProjectGenerator, yeoman.generators.Base);
//
// ProjectGenerator.prototype.prompts = function prompts() {
//   this.newDirectory = false;
//   this._moduleName = this.moduleName;
// };

ProjectGenerator.prototype.project = function project() {
  const _this = this;
  const utils = this.utils;

  const moduleName = i.dasherize(i.underscore(this.moduleName));
  const matches = moduleName.match(/([\w-]+)$/);
  const functionName = i.camelize(i.underscore(matches[1]), false);
  const pathToModule = path.relative(`${moduleName}`, `app/${moduleName}`);

  this.template('module.js', `app/${moduleName}.js`,
    { functionName, moduleName, utils });
  this.template('test.js', `tests/${moduleName}-test.js`,
    { functionName, moduleName, pathToModule, utils });

  const oldIndex = this.fs.read('tests/index-test.js');
  this.fs.write('tests/index-test.js', `${oldIndex}import './${moduleName}-test';
`);

  // This callback is fired when the generator has completed,
  // and includes instructions on what to do next.
  const done = _.bind(function done() {
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
};
