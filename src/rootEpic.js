import { combineEpics } from 'redux-observable'

// Import epics and combine
import deposit from './deposit_mobile/epics'

const rootEpic = combineEpics(
  deposit,
)

export default rootEpic
