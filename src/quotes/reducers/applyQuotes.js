import { obj } from 'the-utils'
import {
  REQUEST_QUOTES_START,
  RECEIVE_QUOTES_SUCCESS,
  RECEIVE_QUOTES_FAILED,
} from '../actions/actionTypes'

const initialState = {
  quotes: [],
  isLoading: false,
  errors: [],
}

export const actionHandlers = {
  [REQUEST_QUOTES_START]: state => ({
    ...state,
    isLoading: true,
  }),
  [RECEIVE_QUOTES_FAILED]: (state, action) => ({
    ...state,
    isLoading: false,
    errors: action.payload,
  }),
  [RECEIVE_QUOTES_SUCCESS]: (state, action) => ({
    ...state,
    isLoading: false,
    quotes: action.payload !== null ? action.payload : [],
  }),
}

const reducers = (state = initialState, action) => {
  const handler = actionHandlers[obj.get(action, 'type', 'default')]
  return handler ? handler(state, action) : state
}

export default reducers
