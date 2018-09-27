import { Observable } from 'rxjs'
// import { WebSocketSubject } from 'rxjs/webSocket'
import {
  mergeMap, retryWhen, map,
  // switchMap, catchError, debounceTime,
} from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { SUBSCRIBE_PAIR } from '../actions/consts'
import { doSubscribePairFullfill } from '../actions/pairs'

// const socket = new WebSocketSubject('ws://35.195.28.154:44300/all')
// const socket = new WebSocketSubject('ws://35.195.28.154:44301/quotes/all')
// new endpoint
// const socket = new WebSocketSubject('ws://35.195.28.154:44301/quotes/custom')

// epic
const subscribePairEpic = (action$, state$, { multiplex }) => action$
  .pipe(
    ofType(SUBSCRIBE_PAIR),
    mergeMap(action => multiplex(
      () => ({ sub: action.payload }),
      () => ({ unsub: action.payload }),
      msg => msg.symbol === action.payload,
    )
      .pipe(
        retryWhen(() => (window.navigator.onLine
          ? Observable.timer(1000)
          : Observable.fromEvent(window, 'online'))),
        map(payload => doSubscribePairFullfill(payload)),
      )),
  )
// .takeUntil(action$.ofType(REQUEST_QUOTES_END))

export default subscribePairEpic
