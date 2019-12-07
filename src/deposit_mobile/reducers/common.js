import get from 'lodash/get'
import { DEPOSIT_DATA_REQUEST, DEPOSIT_DATA_SUCCESS, SET_MODAL, SET_MODAL_SUCCESS } from '../actions/consts'
import { consts } from '../consts'

const initialState = {
  modal: {
    params: {},
    url: undefined,
    show: false,
    status: '',
    method: 'GET',
  },
  deposit: {},
  deposit_data: {
    MT4AccountNumber: undefined,
    amount: 0,
    status: false,
  },
}

export const actionHandlers = {
  [DEPOSIT_DATA_SUCCESS]: (state, action) => ({
    ...state,
    deposit: {
      ...action.payload,
    },
  }),
  [DEPOSIT_DATA_REQUEST]: (state, action) => ({
    ...state,
    deposit_data: action.payload,
  }),
  [SET_MODAL]: (state, action) => ({
    ...state,
    modal: {
      ...state.modal,
      show: action.payload.show,
    },
  }),
  [SET_MODAL_SUCCESS]: (state, action) => {
    const data = action.payload
    let url = data.the3d_url
    const urlArr = url.split('?')
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
  [consts.SET_MODAL_FAILURE]: state => ({
    ...state,
    modal: {
      show: false,
    },
  }),
}

const reducers = (state = initialState, action) => {
  const handler = actionHandlers[get(action, 'type', 'default')]
  return handler ? handler(state, action) : state
}

export default reducers
