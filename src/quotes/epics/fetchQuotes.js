import { Observable } from 'rxjs'
import { WebSocketSubject } from 'rxjs/webSocket'
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
  REQUEST_QUOTES_START,
  // REQUEST_QUOTES_END,
  RECEIVE_QUOTES_FULFILLED,
  // REQUEST_QUOTES_FAILED,
} from '../actions/actionTypes'

// import 'rxjs/add/webSocket/multiplex'

// const socket = WebSocketSubject.create('ws://35.195.28.154:44300/all')
const socket = new WebSocketSubject('ws://35.195.28.154:44300/all')

// epic
const fetchQuotesEpic = action$ =>
  action$
    .ofType(REQUEST_QUOTES_START)
    .mergeMap(action =>
      socket.multiplex(
        () => ({ sub: action.payload }),
        () => ({ unsub: action.payload }),
        msg => msg.symbol === action.payload
      )
        .retryWhen(() => (window.navigator.onLine ?
          Observable.timer(1000) :
          Observable.fromEvent(window, 'online')))
        // .takeUntil(action$.ofType(REQUEST_QUOTES_END))
        .map(payload => ({
          type: RECEIVE_QUOTES_FULFILLED,
          payload,
        })))


export default fetchQuotesEpic
