import 'isomorphic-fetch'
import ioredisMock from 'ioredis-mock'
import falsey from 'falsey'
import { mockMailerService } from './services/Mailer/__mocks__'

jest.mock('./services/Mailer/', () => ({
  mailerService: mockMailerService,
}))

const mockRedis = process.env.CI || !falsey(process.env.MOCK_REDIS)
if (mockRedis) {
  console.log('mocking redis')
  jest.setMock('ioredis', ioredisMock)
}
