import {
  GET_ITEM_REQUEST,
  GET_ITEM_SUCCESS,
} from './consts'


export function getItemRequest(payload) {
  return {
    type: GET_ITEM_REQUEST,
    payload,
  }
}

export function getItemSucceed(payload) {
  return {
    type: GET_ITEM_SUCCESS,
    payload,
  }
}
