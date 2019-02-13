module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
        'packages/**/*.{js,jsx}',
        '!**/node_modules/**',
        '!**/coverage/**',
    ],
    setupFiles: [
        "./setupTests"
    ],
    roots: [
        'packages/',
    ],
};