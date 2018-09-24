import { Observable } from 'rxjs'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/dom/ajax'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/catch'
// import 'rxjs/add/operator/do'
// import 'rxjs/add/operator/delay'
// import 'rxjs/add/operator/switchMap'
// import 'rxjs/add/operator/ignoreElements'

import {
  FETCH_USER_REPO_START, FETCH_USER_REPO_FAILED,
} from '../actions/consts'

import { doUserReposFulfilled } from '../actions/doUsers'

// epic
const fetchUserRepo = action$ => action$
  .ofType(FETCH_USER_REPO_START)
  .switchMap(({ payload }) => Observable.ajax.getJSON(`https://api.github.com/users/${payload}/repos`))
  .map((response) => doUserReposFulfilled(response))
  .catch(error => Observable.of({
    type: FETCH_USER_REPO_FAILED,
    payload: error.xhr.response,
    error: true,
  }))

export default fetchUserRepo
