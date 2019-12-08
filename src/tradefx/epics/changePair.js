import { Observable } from 'rxjs'
// import { WebSocketSubject } from 'rxjs/webSocket'
import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { CHANGE_PAIR } from '../actions/consts'
import { doSubscribePair } from '../actions/pairs'

// const socket = new WebSocketSubject('ws://35.195.28.154:44300/all')
// const socket = new WebSocketSubject('ws://35.195.28.154:44301/quotes/all')
// new endpoint
// const socket = new WebSocketSubject('ws://35.195.28.154:44301/quotes/custom')

// epic
const changePairEpic = action$ =>
  action$.pipe(
    ofType(CHANGE_PAIR),
    switchMap(({ payload: { pair } }) => {
      return Observable.of(doSubscribePair(pair))
    })
  )

export default changePairEpic
