import { createAction } from 'redux-actions'
import {
  REQUEST_USERS_START,
  REQUEST_USERS_SUCCESS,
  USER_SET,
  LOGIN_SET,
} from './consts'

export const doUsers = createAction(REQUEST_USERS_START)
export const doUsersFulfilled = createAction(REQUEST_USERS_SUCCESS)
export const doUserSet = createAction(USER_SET)
export const doLoginSet = createAction(LOGIN_SET)
