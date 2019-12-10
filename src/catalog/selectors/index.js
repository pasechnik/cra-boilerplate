import { createSelector } from 'reselect'
import get from 'lodash/get'
import { emptyCategory } from '../models/category'

export const productsAllSelector = state =>
  get(state, 'catalog.products.data', [])
export const categoriesAllSelector = state =>
  get(state, 'catalog.categories.data', [])
export const categorySelector = state =>
  get(state, 'catalog.category.data', emptyCategory)

export const categoriesByParentSelector = createSelector(
  categoriesAllSelector,
  categorySelector,
  (categories, category) =>
    categories.filter(cat => cat.categoryId === category.id)
)

export const categoriesRootsSelector = createSelector(
  categoriesAllSelector,
  categories => categories.filter(cat => cat.categoryId === null)
)

export const productsByParentSelector = createSelector(
  productsAllSelector,
  categorySelector,
  (products, category) =>
    products.filter(prod => prod.categoryId === category.id)
)
