import { combineEpics } from 'redux-observable'

// Import epics and combine
import home from './home/epics'
import quotes from './quotes/epics'

const rootEpic = combineEpics(
  home,
  quotes,
)

export default rootEpic
