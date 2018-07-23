import { obj } from 'the-utils'
import {
  DEPOSIT_DATA_REQUEST,
  DEPOSIT_DATA_SUCCESS,
  FETCH_DATA_SETTINGS_REQUEST,
  FETCH_DATA_SETTINGS_SUCCESS,
  FETCH_DATA_ERROR,
  ITEM_CHANGE,
} from '../actions/consts'

const initialState = {
  settings: {},
  accountInfo: {
    accounts: [
      {
        account: '',
        currency: '',
      },
    ],
  },
  isLoading: false,
  errors: [],
}

export const actionHandlers = {
  [FETCH_DATA_SETTINGS_REQUEST]: state => ({
    ...state,
    isLoading: true,
  }),
  [DEPOSIT_DATA_REQUEST]: state => ({
    ...state,
    isLoading: true,
  }),
  [DEPOSIT_DATA_SUCCESS]: state => ({
    ...state,
    isLoading: false,
  }),
  [FETCH_DATA_ERROR]: (state, action) => ({
    ...state,
    isLoading: false,
    errors: action.payload,
  }),
  [FETCH_DATA_SETTINGS_SUCCESS]: (state, action) => ({
    ...state,
    isLoading: false,
    settings: action.payload !== null ? action.payload : '',
    accountInfo: action.payload !== null
      ? { ...action.payload.accountInfo,
          country: action.payload.country_by_ip,
          currency: action.payload.currency,
          amount: 250,
        }
      : '',
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
