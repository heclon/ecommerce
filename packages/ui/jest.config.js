const nextJest = require('next/jest')
const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFiles: ['dotenv/config'],
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

  testEnvironment: 'node',
  testEnvironmentOptions: {},
  testRunner: 'jest-circus/runner',
  testSequencer: '@signed/jest-alphabetical-sequencer',
  runner: 'groups',
  moduleNameMapper: {
    '^uuid$': require.resolve('uuid'),
    '^nanoid$': require.resolve('nanoid'),
  },
  forceExit: true,
}

module.exports = async () => {
  const jc = await createJestConfig(customJestConfig)()
  return {
    ...jc,
    transformIgnorePatterns: [
      '^.+\\.module\\.(css|sass|scss)$',
      'node_modules/(?!variables/.*|prepend-http|jsdom-testing-mocks|msgpackr)',
    ],
  }
}
