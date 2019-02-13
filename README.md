# barnacle

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

`barnacle` is the home of shared `React` components and utilities for Ona.

## Creating a New Package

```sh
cd packages
```

Once we’re in the correct directory, we can create and cd into our new package

```sh
mkdir my-new-package && cd my-new-package
```

then we create a new package.json by running yarn init:

```sh
yarn init
```

The new name should follow our NPM Org scope ex. @my-scope-name

It’s also important to have the new package start at a version like 0.0.0 because once we do our first publish using Lerna, it’ll be published at 0.1.0 or 1.0.0.

Here's an example sample `package.json`:

```json
// package.json
{
    "name": "@my-scope-name/my-new-package",
    "version" : "0.0.0",
    "main" : "index.js",  // replace this if different
    "scripts": {
        "jest": "jest --coverage --verbose --color"
    },
    // hook up global testing with lerna
    "jest": {
        "setupFiles": [
            "../../setupTests"
        ]
    },
    "babel": {
        "presets": [
            "@babel/preset-env",
            "@babel/preset-react"
        ],
        "env": {
            "test": {
                "plugins": [
                "transform-es2015-modules-commonjs"
                ]
            }
        }
    }
}
```

## Testing

We recommend that you put your tests in a directory named `tests` inside your package and that you name your test files something like `awesome.tests.js`

To run tests, you do:

```sh
yarn test
```