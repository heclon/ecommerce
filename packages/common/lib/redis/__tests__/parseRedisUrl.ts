import { parseRedisUrl } from '../parseRedisUrl'

describe('parseRedisUrl', () => {
  it('works with rediss protocol', () => {
    expect(parseRedisUrl('rediss://localhost')).toMatchObject([
      {
        database: '0',
        host: 'localhost',
        password: undefined,
        port: 6379,
        tls: {
          agent: false,
          rejectUnauthorized: false,
          requestCert: true,
        },
      },
    ])
  })
  it('works without protocol', () => {
    expect(parseRedisUrl('localhost')).toMatchObject([
      {
        database: '0',
        host: 'localhost',
        password: undefined,
        port: 6379,
      },
    ])
  })
  it('works for localhost', () => {
    expect(parseRedisUrl('config://localhost')).toMatchObject([
      { database: '0', host: 'localhost', password: undefined, port: 6379 },
    ])
  })
  it('works for real url', () => {
    expect(
      parseRedisUrl('rediss://:password@master.provider-choice-staging.yloinq.apse2.cache.amazonaws.com:6380/mydb')
    ).toMatchObject([
      {
        database: 'mydb',
        host: 'master.provider-choice-staging.yloinq.apse2.cache.amazonaws.com',
        password: 'password',
        port: 6380,
      },
    ])
  })
  it('works without args', () => {
    expect(parseRedisUrl()).toMatchObject([
      {
        host: 'localhost',
        port: 6379,
      },
    ])
  })
})
