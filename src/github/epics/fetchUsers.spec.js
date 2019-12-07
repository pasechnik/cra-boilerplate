import { TestScheduler } from 'rxjs/testing'
import get from 'lodash/get'
import fetchUsersEpic from './fetchUsers'
import { FETCH_USERS_START, FETCH_USERS_SUCCESS } from '../actions/consts'

const testScheduler = new TestScheduler((actual, expected) => {
  const a = { ...get(actual, '[0]', {}), frame: 1 }
  const e = {
    ...get(expected, '[0]', {}),
    frame: 1,
  }
  return expect(a).toEqual(e)
})

describe('testing fetch users epic', () => {
  it('basic behaviuor', () => {
    testScheduler.run(({ hot, cold, expectObservable }) => {
      const action$ = hot('-a', {
        a: { type: FETCH_USERS_START, payload: '123' },
      })
      const state$ = null
      const dependencies = {
        getJSON: url =>
          cold('--a', {
            a: {
              total_count: 3,
              incomplete_results: false,
              items: [
                {
                  login: 'test',
                  id: 383316,
                  node_id: 'MDQ6VXNlcjM4MzMxNg==',
                  avatar_url: 'https://avatars3.githubusercontent.com/u/383316?v=4',
                  gravatar_id: '',
                  url: 'https://api.github.com/users/test',
                  html_url: 'https://github.com/test',
                  followers_url: 'https://api.github.com/users/test/followers',
                  following_url: 'https://api.github.com/users/test/following{/other_user}',
                  gists_url: 'https://api.github.com/users/test/gists{/gist_id}',
                  starred_url: 'https://api.github.com/users/test/starred{/owner}{/repo}',
                  subscriptions_url: 'https://api.github.com/users/test/subscriptions',
                  organizations_url: 'https://api.github.com/users/test/orgs',
                  repos_url: 'https://api.github.com/users/test/repos',
                  events_url: 'https://api.github.com/users/test/events{/privacy}',
                  received_events_url: 'https://api.github.com/users/test/received_events',
                  type: 'User',
                  site_admin: false,
                  score: 87.379974,
                },
              ],
              url,
            },
          }),
      }

      const output$ = fetchUsersEpic(action$, state$, dependencies)

      expectObservable(output$).toBe('---a', {
        a: {
          type: FETCH_USERS_SUCCESS,
          payload: {
            total_count: 3,
            incomplete_results: false,
            items: [
              {
                login: 'test',
                id: 383316,
                node_id: 'MDQ6VXNlcjM4MzMxNg==',
                avatar_url: 'https://avatars3.githubusercontent.com/u/383316?v=4',
                gravatar_id: '',
                url: 'https://api.github.com/users/test',
                html_url: 'https://github.com/test',
                followers_url: 'https://api.github.com/users/test/followers',
                following_url: 'https://api.github.com/users/test/following{/other_user}',
                gists_url: 'https://api.github.com/users/test/gists{/gist_id}',
                starred_url: 'https://api.github.com/users/test/starred{/owner}{/repo}',
                subscriptions_url: 'https://api.github.com/users/test/subscriptions',
                organizations_url: 'https://api.github.com/users/test/orgs',
                repos_url: 'https://api.github.com/users/test/repos',
                events_url: 'https://api.github.com/users/test/events{/privacy}',
                received_events_url: 'https://api.github.com/users/test/received_events',
                type: 'User',
                site_admin: false,
                score: 87.379974,
              },
            ],
            url: 'https://api.github.com/search/users?q=123',
          },
        },
      })
    })
  })
})
