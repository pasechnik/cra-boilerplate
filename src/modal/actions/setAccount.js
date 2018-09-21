import { consts } from '../consts'

const setAccount = value => (dispatch) => {
  return dispatch({ type: consts.SET_ACCOUNT, payload: value })
}

export default setAccount
