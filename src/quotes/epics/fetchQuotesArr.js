// import { Observable } from 'rxjs'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/dom/ajax'
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
  REQUEST_QUOTES_ARRAY_START,
  // REQUEST_QUOTES_END,
  // RECEIVE_QUOTES_FULFILLED,
  // RECEIVE_QUOTES_FAILURE,
  REQUEST_QUOTES_START,
} from '../actions/actionTypes'
// import { WebSocketSubject } from 'rxjs/webSocket'
// import 'rxjs/add/webSocket/multiplex'

// const socket = WebSocketSubject.create('ws://35.195.28.154:44300/all')
// const socket = new WebSocketSubject('ws://35.195.28.154:44300/all')


// epic
const fetchQuotesArrEpic = action$ =>
  // console.log(socket)

  action$.ofType(REQUEST_QUOTES_ARRAY_START)
    .mergeMap(action => action.payload.map(payload => ({ type: REQUEST_QUOTES_START, payload })))


export default fetchQuotesArrEpic
