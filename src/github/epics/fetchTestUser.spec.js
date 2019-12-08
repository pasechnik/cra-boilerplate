import { TestScheduler } from 'rxjs/testing'
import fetchUserEpic from './fetchTestUser'

const testScheduler = new TestScheduler((actual, expected) =>
  expect(actual).toEqual(expected)
)

describe('testing test user epic', () => {
  it('basic behaviuor', () => {
    testScheduler.run(({ hot, cold, expectObservable }) => {
      const action$ = hot('-a', {
        a: { type: 'FETCH_USER', payload: '123' }
      })
      const state$ = null
      const dependencies = {
        getJSON: url =>
          cold('--a', {
            a: { url }
          })
      }

      const output$ = fetchUserEpic(action$, state$, dependencies)

      expectObservable(output$).toBe('---a', {
        a: {
          type: 'FETCH_USER_FULFILLED',
          payload: {
            url: 'https://api.github.com/users/123'
          }
        }
      })
    })
  })
})
