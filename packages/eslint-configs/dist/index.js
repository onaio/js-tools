"use strict";

module.exports = {
  "extends": ['react-app', 'eslint:recommended', 'plugin:jsdoc/recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended', 'plugin:@typescript-eslint/eslint-recommended', 'prettier/@typescript-eslint', 'plugin:prettier/recommended', 'plugin:cypress/recommended', 'typestrict'],
  rules: {
    strict: 0,
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/no-large-snapshots': ['warn', {
      maxSize: 50,
      inlineMaxSize: 6
    }],
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
    'jsdoc/require-param-type': 0,
    'jsdoc/require-returns': 0,
    'jsdoc/require-returns-type': 0,
    'no-console': 1,
    'prettier/prettier': 2,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-inferrable-types': 'warn'
  },
  plugins: ['react', '@typescript-eslint', 'prettier', 'jest', 'jsdoc'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json'
  }
};