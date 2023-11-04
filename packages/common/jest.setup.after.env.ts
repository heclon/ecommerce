import ms from 'ms'

const timeout = ms('5 seconds')

beforeAll(() => {})

afterEach(async () => {}, timeout)

afterAll(async () => {
  try {
    // do something afterAll
  } catch (e) {
    console.log(`Error running afterAll
    ${e.message}
    ${e.stack}`)
  }
}, timeout + 1000)
