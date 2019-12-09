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
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_ERROR
} from '../actions/consts'

import { makeCategoriesRequestSucceed } from '../actions/makeDataRequest'

// const url = 'http://api.appshub.xyz/v1/applications'
const url = 'http://localhost:4060/v1/categories'
// epic
export const fetchCategories = action$ =>
  action$.ofType(FETCH_CATEGORIES_REQUEST).mergeMap(() =>
    Observable.ajax
      .getJSON(url)
      .map(response => makeCategoriesRequestSucceed(response))
      .catch(error =>
        Observable.of({
          type: FETCH_CATEGORIES_ERROR,
          payload: error.xhr.response,
          error: true
        })
      )
  )

export default fetchCategories
