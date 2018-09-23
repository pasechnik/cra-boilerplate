import { consts } from '../consts'

const setMethod = value => (dispatch) => {
  return dispatch({ type: consts.SET_METHOD, payload: value })
}

export default setMethod
