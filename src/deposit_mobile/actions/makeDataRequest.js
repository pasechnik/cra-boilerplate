import {
  FETCH_DATA_SETTINGS_REQUEST,
  FETCH_DATA_SETTINGS_SUCCESS,
} from './consts'

export const makeDataRequest = payload => ({
  type: FETCH_DATA_SETTINGS_REQUEST,
  payload,
})

export const makeDataRequestSucceed = payload => ({
  type: FETCH_DATA_SETTINGS_SUCCESS,
  payload,
})
