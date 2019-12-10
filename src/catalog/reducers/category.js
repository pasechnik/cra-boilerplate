import get from 'lodash/get'
import {
  FETCH_CATEGORY_SUCCESS,
  FETCH_CATEGORY_REQUEST,
  FETCH_CATEGORY_ERROR
} from '../actions/consts'
import { emptyCategory } from '../models/category'

const initialState = {
  data: emptyCategory,
  isLoading: false,
  errors: []
}

export const actionHandlers = {
  [FETCH_CATEGORY_REQUEST]: state => ({
    ...state,
    data: emptyCategory,
    isLoading: true
  }),
  [FETCH_CATEGORY_ERROR]: (state, action) => ({
    ...state,
    isLoading: false,
    errors: action.payload
  }),
  [FETCH_CATEGORY_SUCCESS]: (state, action) => ({
    ...state,
    isLoading: false,
    data: get(action, 'payload.category', emptyCategory)
  })
}

export const reducers = (state = initialState, action) => {
  const handler = actionHandlers[get(action, 'type', 'default')]
  return handler ? handler(state, action) : state
}

export default reducers
