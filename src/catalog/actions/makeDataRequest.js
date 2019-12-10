import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORY_REQUEST,
  FETCH_CATEGORY_SUCCESS,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS
} from './consts'

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
