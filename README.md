# js-tools

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

This is the home of shared javascript components and utilities for Ona.

## Typescript Support

It is actually recommended to create all new packages using `Typescript`. The instructions above on how to add a new package are all that you need to get started.

In addition to the above instructions, you need to create a `tsconfig.json` file next to the package.json file inside your new package's directory.

The contents of this file should be something like:

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "dist",
    "declarationDir": "dist/types"
  },
  "include": ["src"]
}
```

## Contribution

Contribution is highly encouraged. If you have something - a tool, a component, a useful utility function, etc. - that would be useful to others then by all means please add it to this repository.

Right now this repo is organised as such:

```
js-tools/
  packages/
    package1/
      package.json
      index.js
    package2/
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

## Viewing Available Packages

We use [Storybook](https://storybook.js.org/) to showcase most packages.

To view this, simply run:

```sh
yarn storybook
```

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

Here's an example sample `package.json` for a `js`/`jsx` package:

```js
// package.json
{
  "name": "@onaio/my-new-package",
  "version": "0.0.0",
  "main": "dist/my-new-package.js", // replace this if different
  "author": "Ona Engineering",
  "license": "Apache-2.0",
  "bugs": {
    "url": "https://github.com/onaio/js-tools/issues"
  },
  "scripts": {
    "jest": "jest --coverage --verbose --color",
    "transpile": "babel src -d dist --root-mode upward --ignore '**/*.test.js,**/*.test.jsx,**/tests,**/__tests__'"
  },
  // the list of files to be included by npm when the package is published
  "files": ["dist"],
  "publishConfig": { "access": "public" },
  // hook up global testing with lerna
  "jest": {
    "setupFiles": ["../../setupTests"]
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

Here's an example sample `package.json` for a `ts`/`tsx` package:

```js
{
  "name": "@onaio/my-new-typescript-package",
  "version": "0.0.0",
  "description": "My new my-new-typescript-package",
  "main": "dist/my-new-typescript-package.js",
  // you WILL need to edit this next line if you have more type declarations
  "types": "dist/types/index.d.ts",
  "repository": "https://github.com/onaio/js-tools",
  "author": "Ona Engineering",
  "license": "Apache-2.0",
  "bugs": {
    "url": "https://github.com/onaio/js-tools/issues"
  },
  "scripts": {
    "jest": "jest --coverage --verbose --color",
    "tsc": "tsc",
    "transpile": "babel src -d dist --root-mode upward --extensions '.ts,.tsx'  --ignore '**/*.test.ts,**/*.test.tsx,**/tests,**/__tests__'"
  },
  // the list of files to be included by npm when the package is published
  "files": ["dist"],
  "publishConfig": { "access": "public" },
  // hook up global testing with lerna
  "jest": {
    "setupFiles": ["../../setupTests"]
  },
  // example minimal dependencies that you have to declare for React components
  "peerDependencies": {
    "react": "^16.8.1"
  },
  "dependencies": {
    "@types/react-table": "^6.7.22",
    "prop-types": "^15.6.1"
  }
}
```

### Add a story

Don't forget to [add a story](https://storybook.js.org/docs/basics/writing-stories/) for the new package, if possible. This allows easy discovery and documentation for other developers or users of `js-tools`.

## Testing

We recommend that you put your tests in a directory named `tests` inside your package and that you name your test files something like `awesome.tests.js`

To run tests, you do:

```sh
yarn test
```

This command translates to `yarn run jest` and so you can supply all the usual [jest options](https://jestjs.io/docs/en/cli).

## Linting

You can run `tlint` on `.ts`/`.tsx` files by doing:

```sh
yarn lint-ts
```

You can run `eslint` on `.js`/`.jsx` files by doing:

```sh
yarn lint-js
```

## Transpiling

You can transpile packages by doing:

```sh
lerna run transpile
```

What this does in the background is that it uses babel to transpile each package that has a `transpile` entry in the `scripts` section of the package's `package.json`.

Your transpiled package is saved in the `dist` directory within each package. Note that this directory is ignored by `git`. Also see the `files` option the `package.json` above.

## Publishing

### Prepare for publishing

Before we publish our packages, we need to prepare them. Currently, this means we need to do two things: generating Typescript type delcaration files, and transpiling the code.

You will need to switch to the package that you want to publish by running

```sh
cd packages/SomePackage
```

Transpile the package - this will create the distribution-ready files:

The command to do this depends on whether the package uses javascript or Typescript.

```sh
# javascript package
yarn babel src -d dist --root-mode upward --ignore '**/*.test.js,**/*.test.jsx,**/tests,**/__tests__'

# typescript package
yarn babel src -d dist --root-mode upward --extensions '.ts,.tsx'  --ignore '**/*.test.ts,**/*.test.tsx,**/tests,**/__tests__'
```

> Note that you may need to compy non-js/non-typescript files to the `dist` directory manually e.g. css files

Once this is done, commit any changes to the `dist` folder.

Next, generate type declaration files for packages written in Typescript:

```sh
yarn tsc
```

Once this is done, commit changes to the `types` folder. You may have to ignore some stubborn linter warnings.

---

Once you have done the above, you would then push your changes, have your code reviewed and eventually merged to master before you proceed.

### Actually publish

Assuming that you have the `js-tools` repo cloned locally, switch to the `master` branch and proceed:

1. To authenticate with Github, you need to define the following environment variable:

> _GH_TOKEN_ (required) - Your GitHub authentication token (under Settings > Developer settings > Personal access tokens)

2. Next, tag releases on Github and create a changelog for all updated packages:

```sh
lerna version --github-release --conventional-commits
```

3. At this point, we are ready to publish to `npm`. You would, of course, need to log in to npm first:

```sh
npm login
```

4. Finally, publish the packages to the `npm` registry:

```sh
lerna publish from-git
```

You may want to checkout documentation for the [`lerna version`](https://github.com/lerna/lerna/tree/master/commands/version) and [`lerna publish`](https://github.com/lerna/lerna/tree/master/commands/publish) commands.
