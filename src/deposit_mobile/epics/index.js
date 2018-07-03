import { combineEpics } from 'redux-observable'

// import your Home Module epics here and combine them
// Place all epics in same directory
import fetchData from './fetchData'

const deposit = combineEpics(fetchData)

export default deposit
