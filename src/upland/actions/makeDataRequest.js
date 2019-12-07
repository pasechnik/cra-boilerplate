import { FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS } from './consts'

export function makeDataRequest(payload) {
  return {
    type: FETCH_DATA_REQUEST,
    payload,
  }
}

export function makeDataRequestSucceed(payload) {
  return {
    type: FETCH_DATA_SUCCESS,
    payload,
  }
}
