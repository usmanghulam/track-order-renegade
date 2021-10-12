module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,tsx}',
    '!**/node_modules/**',
    '!**/build/**',
    '!**/vendor/**',
    '!**/.git/**',
  ],
  modulePaths: ['<rootDir>/src'],
  setupFiles: [
    '<rootDir>/src/setupTests.ts',
  ],
};
