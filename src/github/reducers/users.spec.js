import reducers from './users'
import * as consts from '../actions/consts'

const initialState = {
  count: 0,
  incompleteResults: 0,
  login: '',
  user: undefined,
  userInfo: undefined,
  repos: [],
  data: [],
  isLoading: false,
  errors: [],
}

describe('users reducer', () => {
  it('returns initial state', () => {
    expect(reducers(undefined, {})).toEqual(initialState)
  })

  it('should handle FETCH_USERS_START', () => {
    expect(reducers(initialState, { type: consts.FETCH_USERS_START, payload: 'test' })).toEqual({
      ...initialState,
      isLoading: true,
    })
  })

  it('should handle FETCH_USER_INFO_START', () => {
    expect(reducers(initialState, { type: consts.FETCH_USER_INFO_START, payload: 'test' })).toEqual({
      ...initialState,
      isLoading: true,
    })
  })

  it('should handle FETCH_USER_REPO_START', () => {
    expect(reducers(initialState, { type: consts.FETCH_USER_REPO_START, payload: 'test' })).toEqual({
      ...initialState,
      isLoading: true,
    })
  })

  it('should handle LOGIN_SET', () => {
    expect(reducers(initialState, { type: consts.LOGIN_SET, payload: 'test' })).toEqual({
      ...initialState,
      login: 'test',
    })
  })

  it('should handle USER_SET', () => {
    expect(reducers(initialState, {
      type: consts.USER_SET,
      payload: [
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
    })).toEqual({
      ...initialState,
      user: {
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
    })
  })

  it('should handle FETCH_USERS_FAILED', () => {
    expect(
      reducers(
        initialState,
        {
          type: consts.FETCH_USERS_FAILED,
          payload: 'error message',
          error: true,
        },
      ),
    ).toEqual(
      {
        ...initialState,
        isLoading: false,
        errors: 'error message',
      },
    )
  })

  it('should handle FETCH_USERS_SUCCESS', () => {
    expect(
      reducers(
        initialState,
        {
          type: consts.FETCH_USERS_SUCCESS,
          payload: {
            total_count: 40492,
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
              {
                login: 'astaxie',
                id: 233907,
                node_id: 'MDQ6VXNlcjIzMzkwNw==',
                avatar_url: 'https://avatars3.githubusercontent.com/u/233907?v=4',
                gravatar_id: '',
                url: 'https://api.github.com/users/astaxie',
                html_url: 'https://github.com/astaxie',
                followers_url: 'https://api.github.com/users/astaxie/followers',
                following_url: 'https://api.github.com/users/astaxie/following{/other_user}',
                gists_url: 'https://api.github.com/users/astaxie/gists{/gist_id}',
                starred_url: 'https://api.github.com/users/astaxie/starred{/owner}{/repo}',
                subscriptions_url: 'https://api.github.com/users/astaxie/subscriptions',
                organizations_url: 'https://api.github.com/users/astaxie/orgs',
                repos_url: 'https://api.github.com/users/astaxie/repos',
                events_url: 'https://api.github.com/users/astaxie/events{/privacy}',
                received_events_url: 'https://api.github.com/users/astaxie/received_events',
                type: 'User',
                site_admin: false,
                score: 77.50349,
              },
              {
                login: 'swtestacademy',
                id: 13996767,
                node_id: 'MDQ6VXNlcjEzOTk2NzY3',
                avatar_url: 'https://avatars3.githubusercontent.com/u/13996767?v=4',
                gravatar_id: '',
                url: 'https://api.github.com/users/swtestacademy',
                html_url: 'https://github.com/swtestacademy',
                followers_url: 'https://api.github.com/users/swtestacademy/followers',
                following_url: 'https://api.github.com/users/swtestacademy/following{/other_user}',
                gists_url: 'https://api.github.com/users/swtestacademy/gists{/gist_id}',
                starred_url: 'https://api.github.com/users/swtestacademy/starred{/owner}{/repo}',
                subscriptions_url: 'https://api.github.com/users/swtestacademy/subscriptions',
                organizations_url: 'https://api.github.com/users/swtestacademy/orgs',
                repos_url: 'https://api.github.com/users/swtestacademy/repos',
                events_url: 'https://api.github.com/users/swtestacademy/events{/privacy}',
                received_events_url: 'https://api.github.com/users/swtestacademy/received_events',
                type: 'User',
                site_admin: false,
                score: 46.615784,
              },
            ],
          },
        },
      ),
    ).toEqual(
      {
        ...initialState,
        isLoading: false,
        data: [
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
          {
            login: 'astaxie',
            id: 233907,
            node_id: 'MDQ6VXNlcjIzMzkwNw==',
            avatar_url: 'https://avatars3.githubusercontent.com/u/233907?v=4',
            gravatar_id: '',
            url: 'https://api.github.com/users/astaxie',
            html_url: 'https://github.com/astaxie',
            followers_url: 'https://api.github.com/users/astaxie/followers',
            following_url: 'https://api.github.com/users/astaxie/following{/other_user}',
            gists_url: 'https://api.github.com/users/astaxie/gists{/gist_id}',
            starred_url: 'https://api.github.com/users/astaxie/starred{/owner}{/repo}',
            subscriptions_url: 'https://api.github.com/users/astaxie/subscriptions',
            organizations_url: 'https://api.github.com/users/astaxie/orgs',
            repos_url: 'https://api.github.com/users/astaxie/repos',
            events_url: 'https://api.github.com/users/astaxie/events{/privacy}',
            received_events_url: 'https://api.github.com/users/astaxie/received_events',
            type: 'User',
            site_admin: false,
            score: 77.50349,
          },
          {
            login: 'swtestacademy',
            id: 13996767,
            node_id: 'MDQ6VXNlcjEzOTk2NzY3',
            avatar_url: 'https://avatars3.githubusercontent.com/u/13996767?v=4',
            gravatar_id: '',
            url: 'https://api.github.com/users/swtestacademy',
            html_url: 'https://github.com/swtestacademy',
            followers_url: 'https://api.github.com/users/swtestacademy/followers',
            following_url: 'https://api.github.com/users/swtestacademy/following{/other_user}',
            gists_url: 'https://api.github.com/users/swtestacademy/gists{/gist_id}',
            starred_url: 'https://api.github.com/users/swtestacademy/starred{/owner}{/repo}',
            subscriptions_url: 'https://api.github.com/users/swtestacademy/subscriptions',
            organizations_url: 'https://api.github.com/users/swtestacademy/orgs',
            repos_url: 'https://api.github.com/users/swtestacademy/repos',
            events_url: 'https://api.github.com/users/swtestacademy/events{/privacy}',
            received_events_url: 'https://api.github.com/users/swtestacademy/received_events',
            type: 'User',
            site_admin: false,
            score: 46.615784,
          },
        ],
        count: 40492,
        incompleteResults: false,
      },
    )
  })
})
