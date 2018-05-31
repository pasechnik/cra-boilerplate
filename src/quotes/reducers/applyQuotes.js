import { obj } from 'the-utils'
import mockQuotes from '../../mockData'
import {
  REQUEST_QUOTES_START,
  RECEIVE_QUOTES_FULFILLED,
  RECEIVE_QUOTES_FAILURE,
} from '../actions/actionTypes'

const initialState = {
  quotes: [...mockQuotes],
  isLoading: false,
  errors: [],
}

export const actionHandlers = {
  [REQUEST_QUOTES_START]: state => ({
    ...state,
    isLoading: true,
  }),
  [RECEIVE_QUOTES_FAILURE]: (state, action) => ({
    ...state,
    isLoading: false,
    errors: action.payload,
  }),
  [RECEIVE_QUOTES_FULFILLED]: (state, action) => ({
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
