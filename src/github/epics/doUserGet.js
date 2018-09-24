import { Observable } from 'rxjs'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/dom/ajax'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/catch'
import { doUserInfo, doUserRepos } from '../actions/doUsers'
// import 'rxjs/add/operator/do'
// import 'rxjs/add/operator/delay'
// import 'rxjs/add/operator/switchMap'
// import 'rxjs/add/operator/ignoreElements'

import {
  GET_USER,
} from '../actions/consts'


// epic
const fetchUserInfo = action$ => action$
  .ofType(GET_USER)
  .mergeMap(({ payload: { login } }) => Observable.of(doUserInfo(login), doUserRepos(login)))

// .mergeMap(action => action.payload.map(({ symbol }) => ({ type: REQUEST_QUOTES_START, payload: symbol })))
export default fetchUserInfo
