import { combineEpics } from 'redux-observable'

// import your Home Module epics here and combine them
// Place all epics in same directory
import subscribePairEpic from './subscribePair'
import schangePairEpic from './changePair'
// import fetchQuotesEpic from './fetchQuotes'

const quotes = combineEpics(subscribePairEpic, schangePairEpic)

export default quotes
