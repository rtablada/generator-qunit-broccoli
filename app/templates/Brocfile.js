const Merge = require('broccoli-merge-trees');
const Sass = require('broccoli-sass-source-maps');
const LiveReload = require('broccoli-inject-livereload');
const Funnel = require('broccoli-funnel');
const Babel = require('broccoli-babel-transpiler');
const Concat = require('broccoli-sourcemap-concat');
const rename = require('broccoli-stew').rename;

const pubFiles = new LiveReload('public');

const stylePaths = [
  'styles',
  'node_modules/normalize-css',
  'node_modules/font-awesome/scss',
  'node_modules/yoga-sass/assets',
];

const vendorFileNames = [
  'loader.js',
];

const vendorFolder = new Merge([
  'node_modules/loader.js/lib/loader/',
], {overwrite: true});

const vendorFiles = new Funnel(vendorFolder, {
  files: vendorFileNames,
});

const vendor = Concat(vendorFiles, {
  inputFiles: vendorFileNames,
  outputFile: '/vendor.js',
});

const styles = new Sass(stylePaths, 'app.scss', 'app.css', {});

const babelScript = Babel('src', {
  browserPolyfill: true,
  stage: 0,
  moduleIds: true,
  modules: 'amd',
});

const appScript = Concat(babelScript, {
  inputFiles: [
    '**/*.js',
  ],
  outputFile: '/app.js',
});

const testTree = rename('tests', 'index.html', 'test.html');

const testJs = Concat(testTree, {
  inputFiles: ['**/*.js'],
  outputFile: '/tests.js',
});

const testHTML = new Funnel(testTree, {
  files: ['test.html'],
});

module.exports = new Merge([pubFiles, styles, appScript, vendor, testJs, testHTML]);
