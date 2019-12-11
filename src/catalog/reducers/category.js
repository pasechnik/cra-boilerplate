import get from 'lodash/get'
import {
  FETCH_CATEGORY_SUCCESS,
  FETCH_CATEGORY_REQUEST,
  FETCH_CATEGORY_ERROR,
  SET_CATEGORY_ID
} from '../actions/consts'
import { emptyCategory } from '../models/category'

const initialState = {
  data: emptyCategory,
  id: emptyCategory.id,
  isLoading: false,
  errors: []
}

export const actionHandlers = {
  [SET_CATEGORY_ID]: (state, action) => ({
    ...state,
    id: action.payload
  }),
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
