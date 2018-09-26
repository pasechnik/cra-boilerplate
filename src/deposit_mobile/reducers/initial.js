import get from 'lodash/get'

const initialState = {
  timestamp: 0,
  transactionId: 0,
  clientId: 0,
  currencyCode: 'USD',
  amount: 0,
  sign: '',
}

export const actionHandlers = {}

const reducers = (state = initialState, action) => {
  const handler = actionHandlers[get(action, 'type', 'default')]
  return handler ? handler(state, action) : state
}

export default reducers
