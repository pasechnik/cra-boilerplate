import {
  DELETE_ITEM_REQUEST,
  DELETE_ITEM_SUCCESS,
} from './consts'


export function deleteRequest(payload) {
  return {
    type: DELETE_ITEM_REQUEST,
    payload,
  }
}

export function deleteItemSucceed(payload) {
  return {
    type: DELETE_ITEM_SUCCESS,
    payload,
  }
}
