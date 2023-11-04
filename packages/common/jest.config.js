const customJestConfig = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['dotenv/config', '<rootDir>/jest.setup.ts'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.after.env.ts'],
  rootDir: './',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(tsx?|ts?)$',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>.*/__test-utils__/',
    '<rootDir>/.next',
    '<rootDir>.*.acceptance.test.(tsx?|ts?)',
  ],
  moduleFileExtensions: ['tsx', 'ts', 'js', 'jsx'],
  collectCoverage: false,
  coverageDirectory: '../coverage',
  testEnvironmentOptions: {},
  testRunner: 'jest-circus/runner',
  testSequencer: '@signed/jest-alphabetical-sequencer',
  runner: 'groups',
  moduleNameMapper: {
    '^uuid$': require.resolve('uuid'),
    '^nanoid$': require.resolve('nanoid'),
  },
  forceExit: true,
  transformIgnorePatterns: [
    '^.+\\.module\\.(css|sass|scss)$',
    'node_modules/(?!variables/.*|prepend-http|jsdom-testing-mocks|msgpackr)',
  ],
}

module.exports = customJestConfig
