import { obj } from 'the-utils'
import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERROR,
  ITEM_CHANGE,
} from '../actions/consts'

const initialState = {
  settings: {},
  accountInfo: {},
  isLoading: false,
  errors: [],
}

export const actionHandlers = {
  [FETCH_DATA_REQUEST]: state => ({
    ...state,
    isLoading: true,
  }),
  [FETCH_DATA_ERROR]: (state, action) => ({
    ...state,
    isLoading: false,
    errors: action.payload,
  }),
  [FETCH_DATA_SUCCESS]: (state, action) => ({
    ...state,
    isLoading: false,
    settings: action.payload !== null ? action.payload : '',
    accountInfo: action.payload !== null ? { ...action.payload.accountInfo, country: action.payload.country_by_ip } : '',
  }),
  [ITEM_CHANGE]: (state, action) => ({
    ...state,
    accountInfo: action.payload !== undefined ? action.payload : state.accountInfo,
  }),
}

const reducers = (state = initialState, action) => {
  const handler = actionHandlers[obj.get(action, 'type', 'default')]
  return handler ? handler(state, action) : state
}

export default reducers
