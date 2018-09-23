import { consts } from './consts'
import initial from './initial'
import { obj } from '../../utils/object'

export const actionHandlers = {
  [consts.SET_COMMON_AMOUNT]: (state, action) => {
    const value = action.payload
    return {
      ...state,
      amountStatus: value >= state.amountConfig.min_d && value <= state.amountConfig.max_d,
      fetching: false,
      amountConfig: {
        ...state.amountConfig,
        amount: value || null,
      }
    }
  },
  [consts.SET_COMMON_COUNTRY]: (state, action) => ({
    ...state,
    selectedCountry: action.payload,
    fetching: false,
  }),
  [consts.SET_COMMON_RESPONSE]: (state, action) => ({
    ...state,
    response: {
      ...action.payload,
    },
  }),
}

export const reducers = (state = initial, action) => {
  const handler = actionHandlers[action.type]
  return handler ? handler(state, action) : state
}

export default reducers
