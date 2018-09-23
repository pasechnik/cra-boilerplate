import { createAction } from 'redux-actions'
import { DEPOSIT_DATA_SUCCESS } from '../../../actions/consts'

export const setResponse = createAction(DEPOSIT_DATA_SUCCESS)

// import { consts } from '../consts'
// const setResponse = value => dispatch => dispatch({ type: consts.SET_COMMON_RESPONSE, payload: value })

export default setResponse
