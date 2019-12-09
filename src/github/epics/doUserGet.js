import { Observable } from 'rxjs'
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/mergeMap'
import { doUserInfo, doUserRepos } from '../actions/doUsers'

import { GET_USER } from '../actions/consts'

// epic
const fetchUserInfo = action$ =>
  action$
    .ofType(GET_USER)
    .mergeMap(({ payload: { login } }) =>
      Observable.of(doUserInfo(login), doUserRepos(login))
    )

export default fetchUserInfo
