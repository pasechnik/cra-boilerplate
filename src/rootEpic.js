import { combineEpics } from 'redux-observable'

// Import epics and combine
import home from './home/epics'
import tradefx from './tradefx/epics'
import github from './github/epics'
import crud from './crud/epics'
import catalog from './catalog/epics'
import upland from './upland/epics'

const rootEpic = combineEpics(home, tradefx, github, crud, upland, catalog)

export default rootEpic
