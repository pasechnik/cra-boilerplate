import get from 'lodash/get'
import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR
} from '../actions/consts'

const initialState = {
  data: [],
  isLoading: false,
  errors: []
}

export const actionHandlers = {
  [FETCH_PRODUCTS_REQUEST]: state => ({
    ...state,
    isLoading: true
  }),
  [FETCH_PRODUCTS_ERROR]: (state, action) => ({
    ...state,
    isLoading: false,
    errors: action.payload
  }),
  [FETCH_PRODUCTS_SUCCESS]: (state, action) => ({
    ...state,
    isLoading: false,
    data: get(action, 'payload.products', [])
  })
}

export const reducers = (state = initialState, action) => {
  const handler = actionHandlers[get(action, 'type', 'default')]
  return handler ? handler(state, action) : state
}

export default reducers
