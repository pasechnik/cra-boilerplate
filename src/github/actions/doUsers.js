import { createAction } from 'redux-actions'
import {
  USER_SET,
  LOGIN_SET,
  GET_USER,
  FETCH_USERS_START,
  FETCH_USERS_SUCCESS,
  FETCH_USER_INFO_START,
  FETCH_USER_INFO_SUCCESS,
  FETCH_USER_REPO_START,
  FETCH_USER_REPO_SUCCESS,
} from './consts'

export const doUsers = createAction(FETCH_USERS_START)
export const doUsersFulfilled = createAction(FETCH_USERS_SUCCESS)
export const doUserSet = createAction(USER_SET)
export const doLoginSet = createAction(LOGIN_SET)
export const doUserGet = createAction(GET_USER)
export const doUserInfo = createAction(FETCH_USER_INFO_START)
export const doUserInfoFulfilled = createAction(FETCH_USER_INFO_SUCCESS)
export const doUserRepos = createAction(FETCH_USER_REPO_START)
export const doUserReposFulfilled = createAction(FETCH_USER_REPO_SUCCESS)
