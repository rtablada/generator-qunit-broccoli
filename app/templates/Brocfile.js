'use strict';
/* eslint-env node */

require('dotenv').config();
const Merge = require('broccoli-merge-trees');
const Sass = require('broccoli-sass-source-maps');
const LiveReload = require('broccoli-inject-livereload');
const Autoprefixer = require('broccoli-autoprefixer');
const CssOptimizer = require('broccoli-csso');
const Funnel = require('broccoli-funnel');
const Babel = require('broccoli-babel-transpiler');
const mv = require('broccoli-stew').mv;
const rm = require('broccoli-stew').rm;
const browserify = require('broccoli-watchify');
const envify = require('envify');
// const vueify = require('vueify');


// Edit this function to add browserify transforms,
// external files, bundles, and more
function browserifyInit(b) {
  b.transform(envify);
  // b.transform(vueify);
}

let pubFiles = new LiveReload('public');

if (process.env.EMBER_ENV === 'production') {
  pubFiles = 'public';
}

const stylePaths = [
  'app/styles',
  'node_modules',
];
const appNoSass = rm('app', '**/*.scss');

const babelScript = new Babel(appNoSass);

const appScript = browserify(babelScript, {
  browserify: {
    entries: ['./index'],
    debug: true
  },
  outputFile: 'app.js',

  init: browserifyInit,
});

const compiledSass = new Sass(stylePaths, 'app.scss', 'app.css', {});
const optimizedCSS = new CssOptimizer(compiledSass);
const styles = new Autoprefixer(optimizedCSS);

if (process.env.EMBER_ENV === 'test') {
  const testTree = new Merge([
    mv(babelScript, 'app'),
    mv(new Babel('tests'), 'tests'),
  ]);

  const testJs = browserify(testTree, {
    browserify: {
      entries: ['./tests/index-test'],
      debug: true
    },
    outputFile: 'tests.js',

    init: browserifyInit,
  });

  module.exports = new Merge([pubFiles, styles, appScript, testJs]);
} else {
  module.exports = new Merge([pubFiles, styles, appScript]);
}
