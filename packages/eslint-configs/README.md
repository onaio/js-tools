# Shareable configs

Shareable configs are simply npm packages that export a configuration object.
This config exports commonly used configs within Ona projects.

## Installing

Shareable configs work with the extends feature of `.eslintrc` files. For Example:

```json
{
  "extends": "@onaio/eslint-config"
}
```

Don't forget to install the config - package:

```
yarn add @onaio/eslint-config  or

npm install @onaio/eslint-config
```
