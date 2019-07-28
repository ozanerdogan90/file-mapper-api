module.exports = {
  collectCoverage: true,
  coverageDirectory: "./coverage/",
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  collectCoverageFrom: [
    "src/**/*service.ts",
    "!src/**/*.d.ts"
  ],
  roots: [
    '<rootDir>/src'
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testRegex: '\\.spec\\.ts',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  bail: true,
  testEnvironment: 'node'
};
