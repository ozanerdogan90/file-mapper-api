module.exports = {
  roots: [
    '<rootDir>/api'
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testRegex: '\\.spec\\.ts',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  bail: true,
  testEnvironment: 'node'
};
