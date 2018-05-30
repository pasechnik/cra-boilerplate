import {
  REQUEST_QUOTES_START,
  RECEIVE_QUOTES_FULFILLED,
} from './actionTypes'


export function receiveQuotes(payload) {
  return {
    type: REQUEST_QUOTES_START,
    payload,
  }
}

export function receiveQuotesFulfilled(payload) {
  return {
    type: RECEIVE_QUOTES_FULFILLED,
    payload,
  }
}
