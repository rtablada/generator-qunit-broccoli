{
  "name": "qunit",
  "version": "1.0.0",
  "description": "",
  "main": "public/index.html",
  "scripts": {
    "test": "./node_modules/.bin/testem",
    "serve": "./node_modules/.bin/broccoli-lr serve",
    "build": "./node_modules/.bin/broccoli build dist",
    "lint": "./node_modules/.bin/sass-lint",
    "esfix": "./node_modules/.bin/eslint src --fix && ./node_modules/.bin/eslint tests --fix"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "font-awesome": "^4.5.0",
    "loader.js": "^4.0.1",
    "normalize-css": "^2.3.1",
    "yoga-sass": "^1.0.1"
  },
  "devDependencies": {
    "broccoli": "^0.16.9",
    "broccoli-babel-transpiler": "^5.5.0",
    "broccoli-cli": "^1.0.0",
    "broccoli-funnel": "^1.0.1",
    "broccoli-inject-livereload": "^0.2.0",
    "broccoli-lr": "^0.2.0",
    "broccoli-merge-trees": "^1.1.1",
    "broccoli-sass-source-maps": "^1.6.0",
    "broccoli-sourcemap-concat": "^1.1.6",
    "broccoli-testem-plugin": "0.0.1",
    "eslint": "^2.4.0",
    "eslint-config-rtablada": "^1.0.0",
    "sass-lint": "^1.5.1",
    "testem": "^1.5.0"
  }
}
