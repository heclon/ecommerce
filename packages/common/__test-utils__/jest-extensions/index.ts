import { PartialDeep } from 'type-fest'

export function partialMock<T>(obj: PartialDeep<T>): T {
  return obj as unknown as T
}

/**
 * Overrides process env variables and returns a cloned copy of the original process env.
 * Use this in tests which require env vars defined.
 */
export const overrideProcessEnv = (input: Record<string, string | undefined>): typeof process.env => {
  const original = { ...process.env }

  for (const [key, value] of Object.entries(input)) {
    if (value === undefined) {
      delete process.env[key]
    } else {
      process.env[key] = value
    }
  }

  return original
}
