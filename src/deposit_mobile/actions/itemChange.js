import {
  ITEM_CHANGE,
} from './consts'

export function itemChange(payload) {
  return {
    type: ITEM_CHANGE,
    payload,
  }
}
