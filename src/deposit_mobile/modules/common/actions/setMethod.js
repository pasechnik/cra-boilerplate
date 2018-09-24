import { consts } from '../consts'

const setMethod = value => dispatch => dispatch({ type: consts.SET_METHOD, payload: value })

export default setMethod
