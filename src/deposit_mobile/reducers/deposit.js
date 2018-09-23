import get from 'lodash/get'
import {
  DEPOSIT_DATA_REQUEST,
  DEPOSIT_DATA_SUCCESS,
  DEPOSIT_DATA_ERROR,
  ITEM_CHANGE,
  SET_LOADING,
} from '../actions/consts'

const initialState = {
  isLoading: false,
  errors: [],
}

export const actionHandlers = {
  [DEPOSIT_DATA_REQUEST]: state => ({
    ...state,
    isLoading: true,
  }),
  [DEPOSIT_DATA_ERROR]: (state, action) => ({
    ...state,
    isLoading: false,
    errors: action.payload,
  }),
  [DEPOSIT_DATA_SUCCESS]: state => ({
    ...state,
    isLoading: false,
  }),
  [SET_LOADING]: (state, action) => ({
    ...state,
    isLoading: action.payload,
  }),
  [ITEM_CHANGE]: state => state,
}

const reducers = (state = initialState, action) => {
  const handler = actionHandlers[get(action, 'type', 'default')]
  return handler ? handler(state, action) : state
}

export default reducers
