/**
 * Extract a the flattened type from a nullable / undefined array element
 */
export type GetFlattenedNonNullableType<T> = T extends (infer R)[] ? NonNullable<R> : never
