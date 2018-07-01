import {
  EDIT_ITEM_REQUEST,
  EDIT_ITEM_SUCCESS,
} from './consts'


export function editItemRequest(id, payload) {
  return {
    type: EDIT_ITEM_REQUEST,
    id,
    payload,
  }
}

export function editItemSucceed(payload) {
  return {
    type: EDIT_ITEM_SUCCESS,
    payload,
  }
}
