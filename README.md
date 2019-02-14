# js-tools

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

This is the home of shared javascript components and utilities for Ona.

## Contribution

Contribution is highly encouraged. If you have something - a tool, a component, a useful utility function, etc. - that would be useful to others then by all means please add it to this repository.

Right now this repo is organised as such:

```
js-tools/
  packages/
    package1/
      package.json
      index.js
    package1/
      package.json
      index.js
  package.json
  lerna.json
```

The `packages` directory is meant to hold all our shared js tools as "packages".

### Contribution Guidelines

High level design goals/guidelines for packages are:

- Clean standards-compliant code.
- Don't reinvent the wheel.
- Don't repeat yourself
- As-good-as-possible Documentation.
- A small set of orthogonal features. If two features are very similar, one should be removed.

\*\* these are inspired by [fish](https://fishshell.com/docs/2.0/design.html).

## Creating a New Package

```sh
cd packages
```

Once we’re in the correct directory, we can create and cd into our new package

```sh
mkdir my-new-package && cd my-new-package
```

Then we create a new package.json by running yarn init:

```sh
yarn init
```

The new name should follow our NPM Org scope e.g. `@onaio`

It’s also important to have the new package start at a version like 0.0.0 because once we do our first publish using Lerna, it’ll be published at 0.1.0 or 1.0.0.

Here's an example sample `package.json`:

```js
// package.json
{
  "name": "@onaio/my-new-package",
  "version": "0.0.0",
  "main": "dist/my-new-package.js", // replace this if different
  "license": "Apache-2.0",
  "bugs": {
    "url": "https://github.com/onaio/js-tools/issues"
  },
  "scripts": {
    "jest": "jest --coverage --verbose --color",
    "transpile": "babel src -d dist --ignore '**/*.test.js,**/*.test.jsx'"
  },
  // the list of files to be included by npm when the package is published
  "files": ["dist/my-new-package.js"],
  // hook up global testing with lerna
  "jest": {
    "setupFiles": ["../../setupTests"]
  },
  "babel": {
    "presets": ["@babel/preset-env", "@babel/preset-react"],
    "env": {
      "test": {
        "plugins": ["transform-es2015-modules-commonjs"]
      }
    }
  },
  // example minimal dependencies that you have to declare for React components
  "peerDependencies": {
    "react": "^16.8.1"
  },
  "dependencies": {
    "prop-types": "^15.6.1"
  },
  "devDependencies": {
    "react": "^16.8.1",
    "enzyme": "^3.8.0",
    "enzyme-adapter-react-16": "^1.9.1",
    "enzyme-to-json": "^3.3.5"
  }
}
```

## Testing

We recommend that you put your tests in a directory named `tests` inside your package and that you name your test files something like `awesome.tests.js`

To run tests, you do:

```sh
yarn test
```

This command translates to `yarn run jest` and so you can supply all the usual [jest options](https://jestjs.io/docs/en/cli).

## Linting

You can run `eslint` on `.js`/`.jsx` files by doing:

```sh
yarn lint
```

## Transpiling

You can transpile packages by doing:

```sh
lerna run transpile
```

What this does in the background is that it runs `babel src -d dist --ignore '**/*.test.js,**/*.test.jsx'` for each package.

Your transpiled package is saved in the `dist` directory within each package. Note that this directory is ignored by `git`. Also see the `files` option the `package.json` above.

## Publishing

TODO

## Typescript Support

Coming soon.
