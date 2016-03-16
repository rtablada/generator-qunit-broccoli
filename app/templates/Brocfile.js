const Merge = require('broccoli-merge-trees');
const Sass = require('broccoli-sass-source-maps');
const LiveReload = require('broccoli-inject-livereload');
const Funnel = require('broccoli-funnel');
const Babel = require('broccoli-babel-transpiler');
const Concat = require('broccoli-sourcemap-concat');

const public = new LiveReload('public');

const stylePaths = [
  'styles',
  'node_modules/normalize-css',
  'node_modules/font-awesome/scss',
  'node_modules/yoga-sass/assets',
];

const styles = new Sass(stylePaths, 'app.scss', 'app.css', {});

const babelScript = Babel('src', {
  browserPolyfill: true,
  stage: 0,
  // moduleIds: true,
  // modules: 'amd',
});

const appScript = Concat(babelScript, {
  inputFiles: [
    '**/*.js',
  ],
  outputFile: '/app.js',
});

module.exports = new Merge(['public', styles, appScript]);
