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
import { FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_ERROR } from '../actions/consts'

import { makeProductsRequestSucceed } from '../actions/makeDataRequest'

const url = 'http://localhost:4060/v1/products'
// epic
export const fetchProducts = action$ =>
  action$.ofType(FETCH_PRODUCTS_REQUEST).mergeMap(() =>
    Observable.ajax
      .getJSON(url)
      .map(response => makeProductsRequestSucceed(response))
      .catch(error =>
        Observable.of({
          type: FETCH_PRODUCTS_ERROR,
          payload: error.xhr.response,
          error: true
        })
      )
  )

export default fetchProducts
