import { Observable } from 'rxjs'
import {
  switchMap, map, catchError, debounceTime,
} from 'rxjs/operators'
import { ofType } from 'redux-observable'

import {
  FETCH_USERS_START,
  FETCH_USERS_FAILED,
} from '../actions/consts'

import { doUsersFulfilled } from '../actions/doUsers'

const fetchUsers = (action$, state$, { getJSON }) => action$
  .pipe(
    ofType(FETCH_USERS_START),
    debounceTime(200),
    switchMap(action => getJSON(`https://api.github.com/search/users?q=${action.payload}`)
      .pipe(
        map(response => doUsersFulfilled(response)),
        catchError(error => Observable.of({
          type: FETCH_USERS_FAILED,
          payload: error.xhr.response,
          error: true,
        })),
      )),
  )

export default fetchUsers
