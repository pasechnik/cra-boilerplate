import { obj } from 'the-utils'
import { TAKE_LOCATION } from '../actions/actionTypes'

const initialState = {
  url: '',
}

export const actionHandlers = {
  [TAKE_LOCATION]: (state, action) => {
    const arrPath = action.payload.split('/')
    const url = arrPath[arrPath.length - 1]
    return {
      ...state,
      url,
    }
  },
}

const reducers = (state = initialState, action) => {
  const handler = actionHandlers[obj.get(action, 'type', 'default')]
  return handler ? handler(state, action) : state
}

export default reducers
