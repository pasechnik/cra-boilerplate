import { consts } from '../consts'

const updateAccount = value => dispatch => dispatch({ type: consts.UPDATE_ACCOUNT, payload: value })

export default updateAccount
