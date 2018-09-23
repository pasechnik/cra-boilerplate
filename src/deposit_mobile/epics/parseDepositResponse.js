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
  DEPOSIT_DATA_ERROR, DEPOSIT_DATA_SUCCESS,
} from '../actions/consts'
import { goTo } from '../actions/goTo'
import { depositPendingAction } from '../actions'

// epic
const parseDepositResponse = action$ => action$
  .ofType(DEPOSIT_DATA_SUCCESS)
  .switchMap(({ payload }) => {
    console.log('parsing deposit response')
    if (payload.success === true && payload.status.toLowerCase() === 'success') {
      console.log('success')
      return Observable.of(goTo('/success'))
    }
    if (payload.success === false) {
      console.log('error')
      return Observable.of(goTo('/error'))
    }
    return Observable.of(depositPendingAction('Deposit is in the pending state'))
  })
  .catch((error) => {
    console.log(error)
    return Observable.of({
      type: DEPOSIT_DATA_ERROR,
      payload: 'error.xhr.response',
      error: true,
    })
  })

export default parseDepositResponse
