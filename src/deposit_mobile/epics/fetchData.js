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
import { FETCH_DATA_SETTINGS_REQUEST, FETCH_DATA_ERROR } from '../actions/consts'
import { dataRequestSucceed } from '../actions'

import config from '../config'

// const url = 'http://localhost:4004/mz_cashier_get_general_settings_front'
// epic

const fetchDataEpic = action$ =>
  action$.ofType(FETCH_DATA_SETTINGS_REQUEST).mergeMap(action =>
    Observable.ajax
      .get(
        config.api.generalSettingsFront,
        { application: action.payload },
        { 'Content-Type': 'application/json; charset=utf-8' },
      )
      .map(({ response }) => dataRequestSucceed(response))
      .catch(error =>
        Observable.of({
          type: FETCH_DATA_ERROR,
          payload: error.xhr.response,
          error: true,
        }),
      ),
  )

export default fetchDataEpic
