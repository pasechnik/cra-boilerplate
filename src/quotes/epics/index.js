import { combineEpics } from 'redux-observable'

// import your Home Module epics here and combine them
// Place all epics in same directory
import fetchQuotesEpic from './fetchQuotes'
import fetchQuotesArr from './fetchQuotesArr'

const quotes = combineEpics(fetchQuotesEpic, fetchQuotesArr)

export default quotes
