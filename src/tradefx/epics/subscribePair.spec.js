import { TestScheduler } from 'rxjs/testing'
import subscribePairEpic from './subscribePair'
import { SUBSCRIBE_PAIR, SUBSCRIBE_PAIR_FULFILLED } from '../actions/consts'

const testScheduler = new TestScheduler((actual, expected) => {
  // const a = { ...get(actual, '[0]', {}), frame: 1 }
  // const e = {
  //   ...get(expected, '[0]', {}),
  //   frame: 1,
  // }
  return expect(actual).toEqual(expected)
})

describe('testing subscribe users epic', () => {
  it('basic behaviuor', () => {
    testScheduler.run(({ hot, cold, expectObservable }) => {
      const action$ = hot('-a', {
        a: { type: SUBSCRIBE_PAIR, payload: 'EUR/USD' }
      })
      const state$ = null
      const dependencies = {
        multiplex: () =>
          cold('--a', {
            a: {
              symbol: 'EUR/USD',
              ask: 1.31679,
              bid: 1.31669,
              timestamp: 1537982496,
              direction: 1,
              digits: 5
            }
          })
      }

      const output$ = subscribePairEpic(action$, state$, dependencies)

      expectObservable(output$).toBe('---a', {
        a: {
          type: SUBSCRIBE_PAIR_FULFILLED,
          payload: {
            symbol: 'EUR/USD',
            ask: 1.31679,
            bid: 1.31669,
            timestamp: 1537982496,
            direction: 1,
            digits: 5
          }
        }
      })
    })
  })
})
