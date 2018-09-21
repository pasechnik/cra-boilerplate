import get from 'lodash/get'
import {
  DEPOSIT_DATA_REQUEST,
  DEPOSIT_DATA_SUCCESS,
  DEPOSIT_DATA_ERROR,
  ITEM_CHANGE,
  SET_MODAL,
} from '../actions/consts'

const initialState = {
  isLoading: false,
  errors: [],
  d3_data: {
    status: undefined,
    the3d_form: '',
  },
  modal: {
    show: false,
    url: '',
    params: {
      the3d_url: '',
    },
    method: 'GET',
    status: '',
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
  [DEPOSIT_DATA_SUCCESS]: (state, action) => ({
    ...state,
    isLoading: false,
    d3_data: action.payload,
  }),
  [ITEM_CHANGE]: (state, action) => ({
    ...state,
    d3_data: action.payload !== undefined ? action.payload : state.d3_data,
  }),
  [SET_MODAL]: (state, action) => {
    const data = action.payload
    let url = data.the3d_url
    let urlArr = url.split('?')
    let params = ''
    let method = 'POST'

    if (urlArr[1] !== undefined && urlArr[1] !== '') {
      url = urlArr[0]
      params = urlArr[1]
      method = 'GET'
      if (data.the3d_params.sendMethod !== undefined && data.the3d_params.sendMethod === 'post') {
        delete data.the3d_params.sendMethod
        url = data.the3d_url
        params = data.the3d_params !== undefined ? data.the3d_params : ''
        method = 'POST'
      }
    } else {
      params = data.the3d_params !== undefined ? data.the3d_params : ''
    }

    return {
      ...state,
      modal: {
        ...state.modal,
        show: true,
        url,
        params,
        method,
        status: data.status,
      },
    }
  },
}

const reducers = (state = initialState, action) => {
  const handler = actionHandlers[get(action, 'type', 'default')]
  return handler ? handler(state, action) : state
}

export default reducers
