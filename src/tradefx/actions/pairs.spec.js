import { CHANGE_PAIR, SUBSCRIBE_PAIR, SUBSCRIBE_PAIR_FULFILLED } from './consts'
import { doChangePair, doSubscribePair, doSubscribePairFullfill } from './pairs'

// createAction(CHANGE_PAIR, splitPair)
describe('Actions', () => {
  describe('Change pair ', () => {
    it("should split 'GBP/EUR'", () => {
      const pair = 'GBP/EUR'
      const expectedAction = {
        type: CHANGE_PAIR,
        payload: {
          currencyFrom: 'GBP',
          currencyTo: 'EUR',
          pair
        }
      }
      expect(doChangePair(pair)).toEqual(expectedAction)
    })

    it("should split 'GBP'", () => {
      const pair = 'GBP'
      const expectedAction = {
        type: CHANGE_PAIR,
        payload: {
          currencyFrom: 'GBP',
          currencyTo: 'USD',
          pair
        }
      }
      expect(doChangePair(pair)).toEqual(expectedAction)
    })

    it("returns default pair for ''", () => {
      const pair = ''
      const expectedAction = {
        type: CHANGE_PAIR,
        payload: {
          currencyFrom: 'EUR',
          currencyTo: 'USD',
          pair
        }
      }
      expect(doChangePair(pair)).toEqual(expectedAction)
    })

    it('returns default pair for undefined', () => {
      const pair = undefined
      const expectedAction = {
        type: CHANGE_PAIR,
        payload: {
          currencyFrom: 'EUR',
          currencyTo: 'USD',
          pair: 'EUR/USD'
        }
      }
      expect(doChangePair(pair)).toEqual(expectedAction)
    })

    it('returns default pair for null', () => {
      const pair = null
      const expectedAction = {
        type: CHANGE_PAIR,
        payload: {
          currencyFrom: 'EUR',
          currencyTo: 'USD',
          pair: 'EUR/USD'
        }
      }
      expect(doChangePair(pair)).toEqual(expectedAction)
    })
  })

  describe('Subscribe pair ', () => {
    it('returns payload', () => {
      const pair = 'EUR/USD'
      const expectedAction = {
        type: SUBSCRIBE_PAIR,
        payload: 'EURUSD'
      }
      expect(doSubscribePair(pair)).toEqual(expectedAction)
    })
  })

  describe('Subscribe pair fullfill ', () => {
    it('returns payload', () => {
      const payload = {
        symbol: 'EUR/USD',
        ask: 1.31679,
        bid: 1.31669,
        timestamp: 1537982496,
        direction: 1,
        digits: 5
      }
      const expectedAction = {
        type: SUBSCRIBE_PAIR_FULFILLED,
        payload
      }
      expect(doSubscribePairFullfill(payload)).toEqual(expectedAction)
    })
  })
})
