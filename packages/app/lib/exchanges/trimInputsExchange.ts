import { Exchange, Operation } from 'urql'
import { pipe, tap } from 'wonka'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const trimInputs = (input: any): any => {
  if (typeof input === 'string') {
    return input.trim()
  }
  if (Array.isArray(input)) {
    return input.map((value) => trimInputs(value))
  }
  if (input instanceof Set) {
    return new Set([...input].map((value) => trimInputs(value)))
  }
  if (input instanceof Map) {
    return [...input.entries()].reduce((map, [key, value]) => {
      map.set(key, trimInputs(value))
      return map
    }, new Map())
  }
  if (input != null && typeof input == 'object' && toString.call(input) == '[object Object]') {
    return Object.entries(input).reduce(
      (obj, [key, value]) => ({
        ...obj,
        [key]: trimInputs(value),
      }),
      {}
    )
  }
  // do nothing.
  return input
}

export const trimInput = (operation: Operation) => {
  operation.variables = trimInputs(operation.variables)
  return operation
}

export const trimInputsExchange: Exchange = ({ forward }) => {
  return (ops$) => {
    return pipe(ops$, tap(trimInput), forward)
  }
}
