const Merge = require('broccoli-merge-trees');
const Sass = require('broccoli-sass-source-maps');
const LiveReload = require('broccoli-inject-livereload');
const Autoprefixer = require('broccoli-autoprefixer');
const CssOptimizer = require('broccoli-csso');
const Funnel = require('broccoli-funnel');
const Babel = require('broccoli-babel-transpiler');
const Concat = require('broccoli-sourcemap-concat');
const rename = require('broccoli-stew').rename;

let pubFiles = new LiveReload('public');

if (process.env.EMBER_ENV === 'production') {
  pubFiles = 'public';
}

const stylePaths = [
  'styles',
  'node_modules/normalize-css',
  'node_modules/font-awesome/scss',
  'node_modules/yoga-sass/assets',
];

const vendorFileNames = [
  'fetch.js',
  'loader.js',
];

const vendorFolder = new Merge([
  'node_modules/whatwg-fetch/',
  'node_modules/loader.js/lib/loader/',
], {overwrite: true});

const vendorFiles = new Funnel(vendorFolder, {
  files: vendorFileNames,
});

const vendor = Concat(vendorFiles, {
  inputFiles: vendorFileNames,
  outputFile: '/vendor.js',
});

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

const compiledSass = new Sass(stylePaths, 'app.scss', 'app.css', {});
const optimizedCSS = new CssOptimizer(compiledSass);
const styles = new Autoprefixer(optimizedCSS);

if (process.env.EMBER_ENV === 'test') {
  const testTree = rename('tests', 'index.html', 'test.html');

  const testJs = Concat(testTree, {
    inputFiles: ['**/*.js'],
    outputFile: '/tests.js',
  });

  const testHTML = new Funnel(testTree, {
    files: ['test.html'],
  });

  module.exports = new Merge([pubFiles, styles, appScript, vendor, testJs, testHTML]);
} else {
  module.exports = new Merge([pubFiles, styles, appScript, vendor]);
}
