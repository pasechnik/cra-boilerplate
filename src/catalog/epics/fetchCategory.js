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
import 'rxjs/add/operator/do'
// import 'rxjs/add/operator/delay'
// import 'rxjs/add/operator/switchMap'
// import 'rxjs/add/operator/ignoreElements'
import { FETCH_CATEGORY_ERROR, FETCH_CATEGORY_REQUEST } from '../actions/consts'
import { makeCategoryRequestSucceed } from '../actions/makeDataRequest'

const url = 'http://localhost:4060/v1/categories'
// epic
export const fetchCategory = action$ =>
  action$.ofType(FETCH_CATEGORY_REQUEST).mergeMap(action =>
    Observable.ajax
      .getJSON(`${url}/${action.payload}`)
      // .do(response => console.log({ response }))
      .map(response => makeCategoryRequestSucceed(response))
      .catch(error =>
        Observable.of({
          type: FETCH_CATEGORY_ERROR,
          payload: error.xhr.response,
          error: true
        })
      )
  )

export default fetchCategory
