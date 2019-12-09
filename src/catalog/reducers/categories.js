import get from 'lodash/get'
import {
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_ERROR
} from '../actions/consts'

const initialState = {
  data: [],
  isLoading: false,
  errors: []
}

export const actionHandlers = {
  [FETCH_CATEGORIES_REQUEST]: state => ({
    ...state,
    isLoading: true
  }),
  [FETCH_CATEGORIES_ERROR]: (state, action) => ({
    ...state,
    isLoading: false,
    errors: action.payload
  }),
  [FETCH_CATEGORIES_SUCCESS]: (state, action) => ({
    ...state,
    isLoading: false,
    data: get(action, 'payload.categories', [])
  })
}

export const reducers = (state = initialState, action) => {
  const handler = actionHandlers[get(action, 'type', 'default')]
  return handler ? handler(state, action) : state
}

export default reducers
