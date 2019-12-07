import { createAction } from 'redux-actions'
import get from 'lodash/get'
import { CHANGE_PAIR, SUBSCRIBE_PAIR, SUBSCRIBE_PAIR_FULFILLED } from './consts'

const splitPair = (pair = 'EUR/USD') => {
  const symbols = pair !== null ? pair.split('/') : ['EUR', 'USD']
  const currencyFrom = get(symbols, '[0]', 'EUR')
  return {
    currencyFrom: currencyFrom.length ? currencyFrom : 'EUR',
    currencyTo: get(symbols, '[1]', 'USD'),
    pair: pair !== null ? pair : 'EUR/USD',
  }
}

const stripSlash = (pair = 'EUR/USD') => pair.split('/').join('')

export const doChangePair = createAction(CHANGE_PAIR, splitPair)
export const doSubscribePair = createAction(SUBSCRIBE_PAIR, stripSlash)
export const doSubscribePairFullfill = createAction(SUBSCRIBE_PAIR_FULFILLED)
