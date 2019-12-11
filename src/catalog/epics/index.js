import { combineEpics } from 'redux-observable'

// import your Home Module epics here and combine them
// Place all epics in same directory
import { fetchCategories } from './fetchCategories'
import { fetchCategory } from './fetchCategory'
import { fetchProducts } from './fetchProducts'

// , fetchData, addItem, deleteItem, getItem, editItem
const catalog = combineEpics(fetchCategories, fetchCategory, fetchProducts)

export default catalog
