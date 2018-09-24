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
  FETCH_USERS_START,
  FETCH_USERS_FAILED,
} from '../actions/consts'

import { doUsersFulfilled } from '../actions/doUsers'

/*
fetch(`https://api.github.com/search/users?q=${query}`)
      .then(resp => resp.json())
      .then(json => this.setState({
        isLoading: false,
        options: json.items,
      }));
 */
// epic
// .debounceTime(400)
const fetchUsers = action$ => action$
  .ofType(FETCH_USERS_START)
  .switchMap(action => Observable.ajax.getJSON(`https://api.github.com/search/users?q=${action.payload}`)
    .map(response => doUsersFulfilled(response))
    .catch(error => Observable.of({
      type: FETCH_USERS_FAILED,
      payload: error.xhr.response,
      error: true,
    })))

export default fetchUsers
