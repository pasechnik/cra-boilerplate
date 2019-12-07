import { combineEpics } from 'redux-observable'

// Import epics and combine
import home from './home/epics'
import tradefx from './tradefx/epics'
import github from './github/epics'
import quotes from './quotes/epics'
import crud from './crud/epics'
import upland from './upland/epics'
import deposit from './deposit_mobile/epics'

const rootEpic = combineEpics(home, tradefx, github, quotes, crud, deposit, upland)

export default rootEpic
