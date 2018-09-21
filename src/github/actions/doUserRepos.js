import { createAction } from 'redux-actions'
import {
  REQUEST_USER_REPOS_START,
  REQUEST_USER_REPOS_SUCCESS,
} from './consts'

export const doUserRepos = createAction(REQUEST_USER_REPOS_START)
export const doUserReposFulfilled = createAction(REQUEST_USER_REPOS_SUCCESS)
