import { obj } from 'the-utils'
import {
  DEPOSIT_DATA_REQUEST,
  DEPOSIT_DATA_SUCCESS,
  DEPOSIT_DATA_ERROR,
} from '../actions/consts'

const initialState = {
  isLoading: false,
  errors: [],
  d3_data: {
    status: 'error',
  },
}

export const actionHandlers = {
  [DEPOSIT_DATA_REQUEST]: state => ({
    ...state,
  }),
  [DEPOSIT_DATA_ERROR]: (state, action) => ({
    ...state,
    isLoading: false,
    errors: action.payload,
  }),
  [DEPOSIT_DATA_SUCCESS]: (state, action) => {
    console.log('state=', state)
    console.log('action=', action)
    return {
      ...state,
      isLoading: false,
      d3_data: action.payload,
    }},
}

const reducers = (state = initialState, action) => {
  const handler = actionHandlers[obj.get(action, 'type', 'default')]
  return handler ? handler(state, action) : state
}

export default reducers
