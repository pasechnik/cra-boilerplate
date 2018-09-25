import get from 'lodash/get'
import { Observable } from 'rxjs'
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/switchMap'

import {
  USER_SET,
} from '../actions/consts'

import {
  doUserGet,
} from '../actions/doUsers'

// epic
const afterSetUser = action$ => action$
  .ofType(USER_SET)
  .switchMap((action) => {
    const payload = get(action, 'payload[0]', undefined)
    if (payload !== undefined) {
      return Observable.of(doUserGet(payload))
    }
    return Observable.empty()
  })

export default afterSetUser
