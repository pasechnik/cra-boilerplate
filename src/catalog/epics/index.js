import { combineEpics } from 'redux-observable'

// import your Home Module epics here and combine them
// Place all epics in same directory
import { fetchCategories } from './fetchCategories'
import fetchData from './fetchData'
import addItem from './addNewItem'
import deleteItem from './deleteItem'
import getItem from './getItem'
import editItem from './editItem'

const catalog = combineEpics(fetchCategories, fetchData, addItem, deleteItem, getItem, editItem)

export default catalog
