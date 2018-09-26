import { Observable } from 'rxjs'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/dom/ajax'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/catch'

import {
  FETCH_USER_INFO_START,
  FETCH_USER_INFO_FAILED,
} from '../actions/consts'

import { doUserInfoFulfilled } from '../actions/doUsers'

// epic
const fetchUserInfo = action$ => action$
  .ofType(FETCH_USER_INFO_START)
  .switchMap(({ payload }) => Observable.ajax.getJSON(`https://api.github.com/users/${payload}`))
  .map(response => doUserInfoFulfilled(response))
  .catch(error => Observable.of({
    type: FETCH_USER_INFO_FAILED,
    payload: error.xhr.response,
    error: true,
  }))

export default fetchUserInfo
