import get from 'lodash/get'
import {
  USER_SET,
  LOGIN_SET,
  FETCH_USER_INFO_SUCCESS,
  FETCH_USER_INFO_START,
  FETCH_USERS_START,
  FETCH_USER_REPO_START,
  FETCH_USERS_FAILED,
  FETCH_USERS_SUCCESS,
  FETCH_USER_REPO_SUCCESS,
} from '../actions/consts'

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

export const actionHandlers = {
  [FETCH_USERS_START]: state => ({
    ...state,
    isLoading: true,
  }),
  [FETCH_USER_INFO_START]: state => ({
    ...state,
    isLoading: true,
  }),
  [FETCH_USER_REPO_START]: state => ({
    ...state,
    isLoading: true,
  }),
  [LOGIN_SET]: (state, action) => ({
    ...state,
    login: get(action, 'payload', ''),
  }),
  [USER_SET]: (state, action) => ({
    ...state,
    user: get(action, 'payload[0]', undefined),
  }),
  [FETCH_USERS_FAILED]: (state, action) => ({
    ...state,
    isLoading: false,
    errors: action.payload,
  }),
  [FETCH_USERS_SUCCESS]: (state, action) => ({
    ...state,
    isLoading: false,
    data: get(action, 'payload.items', []),
    count: get(action, 'payload.total_count', 0),
    incompleteResults: get(action, 'payload.incomplete_results', 0),
  }),
  [FETCH_USER_INFO_SUCCESS]: (state, action) => ({
    ...state,
    isLoading: false,
    userInfo: action.payload,
  }),
  [FETCH_USER_REPO_SUCCESS]: (state, action) => ({
    ...state,
    isLoading: false,
    repos: action.payload,
  }),
}

const reducers = (state = initialState, action) => {
  const handler = actionHandlers[get(action, 'type', 'default')]
  return handler ? handler(state, action) : state
}

export default reducers
