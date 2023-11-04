import { trimInput } from './trimInputsExchange'
import { Operation } from 'urql'

describe('trimInputsExchange', () => {
  it('works', () => {
    const operation = {
      variables: {
        testWhiteSpaces: '    String with whitespaces before and after    ',
        array: [
          {
            id: '1',
            value: '   whitespaces in Arrays  ',
          },
          {
            id: '2',
            value: '   another value with whitespaces   ',
          },
        ],
        null: null,
        set: new Set(['     whitespaces in Sets     ', '    another string to fix  ']),
        /*eslint-disable @typescript-eslint/no-explicit-any*/
        map: new Map<any, any>([
          ['x', '   y   '],
          ['z', '   whitespaces in Maps   '],
        ]),
      },
    } as unknown as Operation
    const operationWithTrimmedVars = trimInput(operation)
    expect(operationWithTrimmedVars).toMatchSnapshot()
  })
})
