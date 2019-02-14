module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'packages/**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!**/dist/**'
  ],
  setupFiles: ['./setupTests'],
  roots: ['packages/']
};
