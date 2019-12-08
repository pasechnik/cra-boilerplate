import reducers, { initialState } from './quotes'
import * as consts from '../actions/consts'

describe('quotes reducer', () => {
  describe('initial state', () => {
    it('returns initial state', () => {
      expect(reducers(undefined, {})).toEqual(initialState)
    })
  })

  describe('CHANGE_PAIR', () => {
    it('should handle action', () => {
      expect(
        reducers(initialState, {
          type: consts.CHANGE_PAIR,
          payload: {
            currencyFrom: 'GBP',
            currencyTo: 'EUR',
            pair: 'GBP/EUR'
          }
        })
      ).toEqual({
        ...initialState,
        currencyFrom: 'GBP',
        currencyTo: 'EUR',
        pair: 'GBP/EUR'
      })
    })
  })

  describe('SUBSCRIBE_PAIR', () => {
    it('should handle action', () => {
      expect(
        reducers(initialState, {
          type: consts.SUBSCRIBE_PAIR,
          payload: 'GBPEUR'
        })
      ).toEqual({
        ...initialState,
        isLoading: true
      })
    })
  })

  describe('SUBSCRIBE_PAIR_FULFILLED', () => {
    it('should handle action', () => {
      expect(
        reducers(initialState, {
          type: consts.SUBSCRIBE_PAIR_FULFILLED,
          payload: {
            symbol: 'EUR/USD',
            ask: 1.31679,
            bid: 1.31669,
            timestamp: 1537982496,
            direction: 1,
            digits: 5
          }
        })
      ).toEqual({
        ...initialState,
        isLoading: false,
        oPair: {
          symbol: 'EUR/USD',
          ask: 1.31679,
          bid: 1.31669,
          timestamp: 1537982496,
          direction: 1,
          digits: 5
        }
      })
    })
  })
})
