import { obj } from 'the-utils'
import uuid from 'uuid'
import get from 'lodash/get'
import {
  CLEAR_NOTIFICATION,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORY_SUCCESS,
  FETCH_PRODUCTS_SUCCESS
} from '../actions/consts'

const initialState = {
  isLoading: false,
  messages: []
}

export const actionHandlers = {
  [FETCH_CATEGORIES_SUCCESS]: (state, action) => {
    // console.log({ action })
    return {
      ...state,
      isLoading: false,
      messages: [
        ...state.messages,
        ...get(action, 'payload.notifications', []).map(m => ({
          ...m,
          id: uuid()
        }))
      ]
    }
  },
  [FETCH_CATEGORY_SUCCESS]: (state, action) => ({
    ...state,
    isLoading: false,
    messages: [
      ...state.messages,
      ...get(action, 'payload.notifications', []).map(m => ({
        ...m,
        id: uuid()
      }))
    ]
  }),
  [FETCH_PRODUCTS_SUCCESS]: (state, action) => ({
    ...state,
    isLoading: false,
    messages: [
      ...state.messages,
      ...get(action, 'payload.notifications', []).map(m => ({
        ...m,
        id: uuid()
      }))
    ]
  }),
  [CLEAR_NOTIFICATION]: (state, action) => ({
    ...state,
    isLoading: false,
    messages: [...state.messages.filter(m => m.id !== action.payload)]
  })
}

const reducers = (state = initialState, action) => {
  const handler = actionHandlers[obj.get(action, 'type', 'default')]
  return handler ? handler(state, action) : state
}

export default reducers
