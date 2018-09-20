import get from 'lodash/get'
import {
  REQUEST_USERS_START,
  REQUEST_USERS_FAILED,
  REQUEST_USERS_SUCCESS,
  USER_SET,
  LOGIN_SET,
} from '../actions/consts'

const initialState = {
  count: 0,
  incompleteResults: 0,
  login: '',
  user: undefined,
  data: [],
  isLoading: false,
  errors: [],
}

export const actionHandlers = {
  [REQUEST_USERS_START]: state => ({
    ...state,
    isLoading: true,
  }),
  [LOGIN_SET]: (state, action) => ({
    ...state,
    isLoading: false,
    login: get(action, 'payload', ''),
  }),
  [USER_SET]: (state, action) => ({
    ...state,
    isLoading: false,
    user: get(action, 'payload[0]', undefined),
  }),
  [REQUEST_USERS_FAILED]: (state, action) => ({
    ...state,
    isLoading: false,
    errors: action.payload,
  }),
  [REQUEST_USERS_SUCCESS]: (state, action) => ({
    ...state,
    isLoading: false,
    data: get(action, 'payload.items', []),
    count: get(action, 'payload.total_count', 0),
    incompleteResults: get(action, 'payload.incomplete_results', 0),
  }),
}

const reducers = (state = initialState, action) => {
  const handler = actionHandlers[get(action, 'type', 'default')]
  return handler ? handler(state, action) : state
}

export default reducers
