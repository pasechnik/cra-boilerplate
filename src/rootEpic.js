import { combineEpics } from 'redux-observable'

// Import epics and combine
import home from './home/epics'
import quotes from './quotes/epics'
import data from './crud/epics'

const rootEpic = combineEpics(
  home,
  quotes,
  data,
)

export default rootEpic
