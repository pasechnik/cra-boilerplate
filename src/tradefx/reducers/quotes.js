import get from 'lodash/get'
import {
  CHANGE_PAIR,
  SUBSCRIBE_PAIR,
  SUBSCRIBE_PAIR_FULFILLED
} from '../actions/consts'

export const initialState = {
  pairs: ['EUR/USD', 'GBP/USD', 'CHF/USD'],
  pair: 'EUR/USD',
  oPair: {
    symbol: 'EUR/USD',
    ask: 1,
    bid: 1,
    timestamp: 1,
    direction: 1,
    digits: 0
  },
  amount: 1000000,
  currencyFrom: 'EUR',
  currencyTo: 'USD',
  isLoading: true
}

export const actionHandlers = {
  [CHANGE_PAIR]: (state, action) => ({
    ...state,
    ...action.payload
  }),
  [SUBSCRIBE_PAIR]: state => ({
    ...state,
    isLoading: true
  }),
  [SUBSCRIBE_PAIR_FULFILLED]: (state, action) => ({
    ...state,
    oPair: { ...action.payload },
    isLoading: false
  })
}

const reducers = (state = initialState, action) => {
  const handler = actionHandlers[get(action, 'type', 'default')]
  return handler ? handler(state, action) : state
}

export default reducers
