import {
  mergeMap, map,
} from 'rxjs/operators'
import { ofType } from 'redux-observable'

const fetchUserTestEpic = (action$, state$, { getJSON }) => action$
  .pipe(
    ofType('FETCH_USER'),
    mergeMap(action => getJSON(`https://api.github.com/users/${action.payload}`)
      .pipe(
        map(response => ({ type: 'FETCH_USER_FULFILLED', payload: response })),
      )),
  )

export default fetchUserTestEpic
