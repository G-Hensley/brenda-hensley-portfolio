export default {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  moduleFileExtensions: ['js'],
  transform: {
    '^.+\\.js$': 'babel-jest' // Transform .js files with babel-jest
  },
  // Ensure node_modules are not ignored for specific ES Module packages
  transformIgnorePatterns: [
    '/node_modules/(?!mongoose|other-esm-package)/'
  ]
};