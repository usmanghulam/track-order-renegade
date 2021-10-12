module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/build/**',
    '!**/vendor/**',
    '!**/.git/**',
  ],
  modulePaths: ['<rootDir>/src'],
  setupFiles: [
    '<rootDir>/src/setupTests.js',
  ],
};
