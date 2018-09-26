import get from 'lodash/get'
import {} from '../actions/consts'

const initialState = {
  pairs: ['EUR/USD', 'GBP/USD', 'CHF/USD'],
  amount: 1000000,
  currencyFrom: 'EUR',
  currencyTo: 'USD',
  isLoading: false,
}

export const actionHandlers = {}

const reducers = (state = initialState, action) => {
  const handler = actionHandlers[get(action, 'type', 'default')]
  return handler ? handler(state, action) : state
}

export default reducers
