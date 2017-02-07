# SASS Broccoli Qunit Generator

This Yeoman generator will create a simple Broccoli project that comes setup for web development with SASS, ES6 modules (using Babel transpiling), QUnit (but ).
It also will install [Yoga Sass](http://rtablada.github.io/yoga-sass), [Font Awesome](http://fontawesome.io), and [Normalize CSS](https://necolas.github.io/normalize.css/).

## Installing the Generator

```bash
npm install -g yarn yo generator-qunit-broccoli
```

> **UPGRADE NOTE** This Generator has be updated to use [`yarn`](https://yarnpkg.com/) to start projects MUCH faster _see [below for benchmarks](#yarn-benchmarks)_.
> To take advantage of this just install yarn with `npm install -g yarn`.

## Creating Projects

To create a project with this generator run:

```bash
yo qunit-broccoli
```

This will ask you for your project name, and a few details to get up and started.

## Running the Development Server

Once the project has been created, move into the directory and then run:

```bash
npm run start
```

The `Brocfile.js` injects live reload into HTML files in the `public` directory.
This command is backed by `ember-cli` which will fire a reload whenever Broccoli rebuilds any trees.

## Building the Project

To build the project into a final production build, run:

```bash
npm run build
```

This will build the project into a `dist` directory that can be uploaded to services such as Firebase, Surge, or AWS.

## Linting SASS

This project comes with [SASS Lint](https://github.com/sasstools/qunit-lint) support.

To run SASS lint, run the command:

```bash
npm run lint
```

The rules installed beyond the [SASS Lint](https://github.com/sasstools/qunit-lint/blob/master/lib/config/qunit-lint.yml) defaults:

* Class Name Format: BEM
* No IDs
* No Important
* Hex Notation: Lowercase
* Indentation: 2 Spaces
* Property Sort Order: SMACSS
  - Box
  - Border
  - Background
  - Text
  - Other

## Yarn Benchmarks

This generator makes an incredibly strong starting project and build stack that can be used to make production quality builds out-of-the-box!
But, this means a lot of dependancies including ember-cli, Rollup, autoprefixer, lib-sass, Babel, and more.

With all of the dependancies required this project has been taking longer and longer to run.
Luckily, yarn has helped this a ton!

Here are some initial benchmarks.

For full transparency these benchmarks were run with the following system and internet connection.

Computer:

```
Mid 2011 Macbook Air
1.8 GHz Intel Core i7
4 GB 1333 MHz DDR3
```

Internet

```
"1Gbps Fibre"
Tested at 120Mbps using http://fast.com
```

These installs were done on a "warm cache", meaning that I had just created a fresh project with the old `qunit-broccoli` generator before running these benchmarks.
Results may not be as great if you are running after just creating a new project, but you should still see a drastic improvement!

### Results

NPM:

```
yo qunit-broccoli npm-install  96.82s user 32.55s system 58% cpu 3:40.17 total
yo qunit-broccoli npm-install  83.97s user 23.61s system 61% cpu 2:55.85 total
```

Yarn:

```
yo qunit-broccoli yarn-test  46.75s user 19.89s system 114% cpu 58.283 total
yo qunit-broccoli yarn-test  60.26s user 26.56s system 91% cpu 1:34.72 total
```

And for good measure I went ahead and cleaned cache for both NPM and Yarn.
Here are those results:

NPM:

```
yo qunit-broccoli npm-install  94.89s user 26.65s system 45% cpu 4:26.77 total
```

Yarn:

```
yo qunit-broccoli yarn-test  68.04s user 31.62s system 121% cpu 1:21.83 total
```

It was a bit surprising to see that the last yarn install was actually faster than on a warm cache.
I think this was because Finder and MacOS Sierra was using a lot of CPU resources.

Still, there's a drastic improvement!!!
