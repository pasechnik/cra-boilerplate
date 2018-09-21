import { combineEpics } from 'redux-observable'

// import your Home Module epics here and combine them
// Place all epics in same directory
import fetchData from './fetchData'
import makeDeposit from './makeDeposit'
import sendNotification from './sendNotification'

const deposit = combineEpics(fetchData, makeDeposit, sendNotification)

export default deposit
