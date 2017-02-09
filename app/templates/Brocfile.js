'use strict';

/* eslint-env node */

require('dotenv').config();
const Merge = require('broccoli-merge-trees');
const Sass = require('broccoli-sass-source-maps');
const LiveReload = require('broccoli-inject-livereload');
const Autoprefixer = require('broccoli-autoprefixer');
const CssOptimizer = require('broccoli-csso');
const Rollup = require('broccoli-rollup');
const Babel = require('broccoli-babel-transpiler');
const mv = require('broccoli-stew').mv;
const rm = require('broccoli-stew').rm;


const nodeResolve = require('rollup-plugin-node-resolve');
const replace = require('rollup-plugin-replace');
const builtins = require('rollup-plugin-node-builtins');
const globals = require('rollup-plugin-node-globals');
const commonjs = require('rollup-plugin-commonjs');
// const vue = require('rollup-plugin-vue');

const plugins = [
  replace({
    'process.env.NODE_ENV': JSON.stringify(process.env.EMBER_ENV)
  }),
  nodeResolve({ jsnext: true, main: true }),
  commonjs({ include: 'node_modules/**' }),
  builtins(),
  globals(),
  // vue(),
];


let pubFiles = new LiveReload('public');

if (process.env.EMBER_ENV === 'production') {
  pubFiles = 'public';
}

const stylePaths = [
  'app/styles',
  'node_modules/font-awesome/scss',
  'node_modules/normalize-css',
  'node_modules/yoga-sass/assets',
];
const appNoSass = rm('app', '**/*.scss');

const babelScript = new Babel(appNoSass);

const appScript = new Rollup(babelScript, {
  rollup: {
    sourceMap: true,
    entry: './index.js',
    plugins,
    targets: [{ dest: 'app.js', format: 'iife', }]
  }
});

const compiledSass = new Sass(stylePaths, 'app.scss', 'app.css', {});
const optimizedCSS = new CssOptimizer(compiledSass);
const styles = new Autoprefixer(optimizedCSS);

if (process.env.EMBER_ENV === 'test') {
  const testTree = new Merge([
    mv(babelScript, 'app'),
    mv(new Babel('tests'), 'tests'),
  ]);

  const testJs = new Rollup(testTree, {
    rollup: {
      entry: './tests/index-test.js',
      plugins: [
        nodeResolve({ jsnext: true, main: true }),
        commonjs({ include: 'node_modules/**' }),
      ],
      targets: [{ dest: 'tests.js', format: 'iife', }]
    }
  });

  module.exports = new Merge([pubFiles, styles, appScript, testJs]);
} else {
  module.exports = new Merge([pubFiles, styles, appScript]);
}
