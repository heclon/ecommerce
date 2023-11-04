export function assertNonEmptyString(value: unknown): asserts value is string {
  if (typeof value !== 'string' || value === '') throw new Error(`'${value}' must be a non-empty string.`)
}

export function assertNonNullable<T>(value: T): asserts value is Exclude<T, null | undefined> {
  if (value === null || value === undefined) throw new Error(`'${value}' must not be null or undefined.`)
}
