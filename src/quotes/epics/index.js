import { combineEpics } from 'redux-observable'

// import your Home Module epics here and combine them
// Place all epics in same directory
import fetchQuotesEpic from './fetchQuotes'

const quotes = combineEpics(fetchQuotesEpic)

export default quotes
