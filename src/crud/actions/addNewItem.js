import {
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS,
} from './consts'


export function AddItemRequest(payload) {
  return {
    type: ADD_ITEM_REQUEST,
    payload,
  }
}

export function addNewItemSucceed(payload) {
  return {
    type: ADD_ITEM_SUCCESS,
    payload,
  }
}
