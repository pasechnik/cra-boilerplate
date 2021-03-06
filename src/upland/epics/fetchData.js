import { Observable } from 'rxjs'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/dom/ajax'
import 'rxjs/add/observable/timer'
import 'rxjs/add/observable/fromEvent'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/retryWhen'
import 'rxjs/add/operator/takeUntil'
import 'rxjs/add/operator/debounceTime'
// import 'rxjs/add/operator/do'
// import 'rxjs/add/operator/delay'
// import 'rxjs/add/operator/switchMap'
// import 'rxjs/add/operator/ignoreElements'
import {
  FETCH_DATA_REQUEST,
  // REQUEST_QUOTES_END,
  FETCH_DATA_ERROR
  // REQUEST_QUOTES_FAILED,
} from '../actions/consts'

import { makeDataRequestSucceed } from '../actions/makeDataRequest'

const url = 'http://localhost:4004/mz_cashier_get_general_settings_front'
// epic
const fetchDataEpic = action$ =>
  action$.ofType(FETCH_DATA_REQUEST).mergeMap(action =>
    Observable.ajax
      .get(
        url,
        { application: action.payload },
        { 'Content-Type': 'application/json; charset=utf-8' }
      )
      .map(response => makeDataRequestSucceed(response.response))
      .catch(error =>
        Observable.of({
          type: FETCH_DATA_ERROR,
          payload: error.xhr.response,
          error: true
        })
      )
  )
export default fetchDataEpic
