import { obj } from 'the-utils'
import {
  DEPOSIT_DATA_REQUEST,
  DEPOSIT_DATA_SUCCESS,
  DEPOSIT_DATA_ERROR,
} from '../actions/consts'

const initialState = {
  isLoading: false,
  errors: [],
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
  [DEPOSIT_DATA_SUCCESS]: state => ({
    ...state,
  }),
}

const reducers = (state = initialState, action) => {
  const handler = actionHandlers[obj.get(action, 'type', 'default')]
  return handler ? handler(state, action) : state
}

export default reducers
