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
import { SEND_NOTIFICATION_START, SEND_NOTIFICATION_ERROR } from '../actions/consts'
import { sendNotificationSuccess } from '../actions/modal'

// epic
const sendNotificationEpic = action$ =>
  action$
    .ofType(SEND_NOTIFICATION_START)
    .switchMap(action => {
      const { account, amount, status } = action.payload
      const urlStatus = `/wp-content/themes/freshdesign/includes/ajax-handler-deposit.php?action=deposit_${status}`

      return Observable.ajax.post(
        urlStatus,
        { accountId: account, amount, action: `deposit_${status}` },
        { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
      )
    })
    .map(({ response }) => {
      console.log(response)
      return sendNotificationSuccess(response)
    })
    .catch(error => {
      console.log(error)
      return Observable.of({
        type: SEND_NOTIFICATION_ERROR,
        payload: 'error.xhr.response',
        error: true,
      })
    })

export default sendNotificationEpic
