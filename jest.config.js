/* eslint-env node */

module.exports = {
  roots: ['frontend'],

  verbose: true,

  moduleFileExtensions: ['js', 'ts', 'tsx'],

  moduleNameMapper: {
    '\\.(s?css)$': 'identity-obj-proxy',
  },

  preset: 'ts-jest',

  testMatch: ['**/*_test.(ts|tsx)'],

  transform: {
    '^.+\\.js$': 'babel-jest',
  },

  // Transform import/export used in @material/* packages.
  transformIgnorePatterns: ['/node_modules/(?!@material).+\\.js$'],

  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.test.json',
    },
  },

  snapshotSerializers: ['enzyme-to-json/serializer'],

  setupFiles: ['<rootDir>/frontend/setup_test.js'],
};
