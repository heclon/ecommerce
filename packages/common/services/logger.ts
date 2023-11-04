export const logger = {
  error: (msg: string, error?: unknown) => {
    if (error) {
      console.error('[ERROR]: ', msg, error)
    } else {
      console.error('[ERROR]: ', msg)
    }
  },
  info: (msg: string) => console.log('[INFO]: ', msg),
}
