import { ReadStream } from 'fs'
import toArray from 'stream-to-array'

export const toBuffer = async (stream: ReadStream): Promise<Buffer> => {
  const array = await toArray(stream)
  const buffers = array.map((chunk) => (Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)))
  return Buffer.concat(buffers)
}
