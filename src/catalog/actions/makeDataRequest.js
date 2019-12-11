import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORY_REQUEST,
  FETCH_CATEGORY_SUCCESS,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  SET_CATEGORY_ID
} from './consts'

export const setCategoryId = payload => ({
  type: SET_CATEGORY_ID,
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

export const makeCategoryRequest = payload => ({
  type: FETCH_CATEGORY_REQUEST,
  payload
})

export const makeCategoryRequestSucceed = payload => ({
  type: FETCH_CATEGORY_SUCCESS,
  payload
})

export const makeProductsRequest = payload => ({
  type: FETCH_PRODUCTS_REQUEST,
  payload
})

export const makeProductsRequestSucceed = payload => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload
})
