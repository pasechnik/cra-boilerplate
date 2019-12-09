import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS
} from './consts'

export const makeDataRequest = payload => ({
  type: FETCH_DATA_REQUEST,
  payload
})

export const makeDataRequestSucceed = payload => ({
  type: FETCH_DATA_SUCCESS,
  payload
})

export const makeCategoriesRequest = payload => ({
  type: FETCH_CATEGORIES_REQUEST,
  payload
})

export const makeCategoriesRequestSucceed = payload => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload
})
