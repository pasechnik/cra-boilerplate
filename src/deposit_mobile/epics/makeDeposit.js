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
import {
  DEPOSIT_DATA_REQUEST,
  // REQUEST_QUOTES_END,
  DEPOSIT_DATA_ERROR,
  // REQUEST_QUOTES_FAILED,
} from '../actions/consts'
import goTo from '../actions/goTo'
import { makeDepositRequestSucceed } from '../actions/makeDepositRequest'

import config from '../config'

// const url = 'http://localhost:4004/mz_cashier_deposit'
// epic
const AddDepositEpic = (action$, store) => action$
  .ofType(DEPOSIT_DATA_REQUEST)
  .switchMap((action) => {
    // let urlEncodedData = ''
    // const urlEncodedDataPairs = []
    const urlEncodedData = Object.keys(action.payload)
      .map(name => `${encodeURIComponent(name)}=${encodeURIComponent(action.payload[name])}`)
      .join('&')
      .replace(/%20/g, '+')

    // Object.keys(action.payload)
    //   .map((name) => {
    //     urlEncodedDataPairs.push(`${encodeURIComponent(name)}=${encodeURIComponent(action.payload[name])}`)
    //     return true
    //   })
    //
    // urlEncodedData = urlEncodedDataPairs.join('&')
    //   .replace(/%20/g, '+')

    return Observable.ajax.post(
      config.api.newDepositURL,
      urlEncodedData,
      { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
    )
  })
  .map((response) => {
    const r = makeDepositRequestSucceed(response.response)
    if (response.response.success === true && response.response.status !== 'Pending') {
      return goTo('/success')
    }
    return r
  })
  .catch((error) => {
    console.log(error)
    return Observable.of({
      type: DEPOSIT_DATA_ERROR,
      payload: 'error.xhr.response',
      error: true,
    })
  })

export default AddDepositEpic
