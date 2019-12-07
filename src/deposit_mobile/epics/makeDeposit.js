import { Observable } from 'rxjs'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/dom/ajax'
import 'rxjs/add/observable/timer'
import 'rxjs/add/observable/fromEvent'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/retryWhen'
import 'rxjs/add/operator/takeUntil'
import 'rxjs/add/operator/debounceTime'
// import 'rxjs/add/operator/do'
// import 'rxjs/add/operator/delay'
// import 'rxjs/add/operator/switchMap'
// import 'rxjs/add/operator/ignoreElements'
import { DEPOSIT_DATA_REQUEST, DEPOSIT_DATA_ERROR } from '../actions/consts'
import { depositRequestSucceed } from '../actions'

import config from '../config'

// const url = 'http://localhost:4004/mz_cashier_deposit'
// epic
const makeDepositEpic = action$ =>
  action$
    .ofType(DEPOSIT_DATA_REQUEST)
    .switchMap(action => {
      const urlEncodedData = Object.keys(action.payload)
        .map(name => `${encodeURIComponent(name)}=${encodeURIComponent(action.payload[name])}`)
        .join('&')
        .replace(/%20/g, '+')

      return Observable.ajax.post(config.api.newDepositURL, urlEncodedData, {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      })
    })
    .map(({ response }) => depositRequestSucceed(response))
    .catch(error => {
      console.log(error)
      return Observable.of({
        type: DEPOSIT_DATA_ERROR,
        payload: 'error.xhr.response',
        error: true,
      })
    })

export default makeDepositEpic
