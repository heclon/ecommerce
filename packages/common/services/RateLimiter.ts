import Bottleneck from 'bottleneck'
import ms from 'ms'
import { parseRedisUrl } from '../lib/redis/parseRedisUrl'

export const redisOptions = {
  ...parseRedisUrl(process.env.REDIS_URL)[0],
  db: 5,
}

export class GoogleMapsRateLimiter {
  private static _instance: Bottleneck

  private static initInstance() {
    const options = {
      maxConcurrent: 10,
      minTime: 10,
      id: 'google-maps',
      clearDatastore: true,
      datastore: 'ioredis',
      clientOptions: redisOptions,
      highWater: parseFloat(process.env.GOOGLE_MAPS_HIGHWATER || process.env.GOOGLE_MAPS_RESERVOIR || '250'),
      strategy: Bottleneck.strategy.BLOCK,
      reservoir: parseFloat(process.env.GOOGLE_MAPS_RESERVOIR || '250'),
      reservoirRefreshAmount: parseFloat(process.env.GOOGLE_MAPS_RESERVOIR || '250'),
      reservoirIncreaseMaximum: parseFloat(process.env.GOOGLE_MAPS_RESERVOIR || '250'),
      reservoirRefreshInterval: ms(process.env.GOOGLE_MAPS_RESERVOIR_REFRESH || '1 minute'),
    }
    const instance = new Bottleneck(options)
    instance.on('depleted', () => {
      console.warn(`The ${options.id} Bottleneck reservoir of ${options.reservoir} calls to 
        google-maps is depleted. Future request are on hold until the next reservoir refresh interval of
        ${ms(options.reservoirRefreshInterval, { long: true })}`)
    })
    return instance
  }

  public static get Instance(): Bottleneck {
    return this._instance || (this._instance = GoogleMapsRateLimiter.initInstance())
  }
}
