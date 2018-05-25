import { obj } from 'the-utils'
import {
  CHOOSE_SELL_OPERATION,
  CHOOSE_BUY_OPERATION,
} from '../actions/actionTypes'

const initialState = {
  sell: false,
  buy: true,
}

export const actionHandlers = {
  [CHOOSE_SELL_OPERATION]: state => ({
    ...state,
    sell: true,
    buy: false,
  }),
  [CHOOSE_BUY_OPERATION]: state => ({
    ...state,
    sell: false,
    buy: true,
  }),
}

const reducers = (state = initialState, action) => {
  const handler = actionHandlers[obj.get(action, 'type', 'default')]
  return handler ? handler(state, action) : state
}

export default reducers
