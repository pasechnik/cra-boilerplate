import {
  CHOOSE_SELL_OPERATION,
  CHOOSE_BUY_OPERATION,
} from './actionTypes'


export function chooseSellOperation() {
  return {
    type: CHOOSE_SELL_OPERATION,
  }
}

export function chooseBuyOperation() {
  return {
    type: CHOOSE_BUY_OPERATION,
  }
}
