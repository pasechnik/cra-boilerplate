import { combineEpics } from 'redux-observable'

// Import epics and combine
import home from './home/epics'
import quotes from './quotes/epics'
import crud from './crud/epics'
import deposit from './deposit_mobile/epics'
import upland from './upland/epics'

const rootEpic = combineEpics(
  home,
  quotes,
  crud,
  deposit,
  upland,
)

export default rootEpic
