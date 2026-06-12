module.exports = {
  collectCoverageFrom: ['**/*/*.{js,jsx}', '!**/node_modules/**', '!**/coverage/**'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/', 'package.json', 'package-lock.json'],
  coverageProvider: 'v8',
  globalSetup: '<rootDir>/test-dotenv.js',
  testTimeout: 30000,
  testMatch: ['**/specs/**/*.[jt]s?(x)', '**/?(*.)+(test).[tj]s?(x)'],
  moduleNameMapper: {
    '#node-web-compat': './node-web-compat-node.js'
  }
};
