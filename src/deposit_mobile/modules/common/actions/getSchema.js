import fetch from 'isomorphic-fetch'
import APPCONFIG from '../config'
import { consts } from '../consts'

const url = 'http://localhost:4004'

const getSchema = path => dispatch => {
  dispatch({ type: consts.COMMON_SCHEMA_REQUEST })
  fetch(url + path, {
    method: 'GET',
    credentials: 'include',
  })
    .then(response => response.json())
    .then(json => dispatch({ type: consts.COMMON_SCHEMA_SUCCESS, payload: json }))
    .catch(error => dispatch({ type: consts.COMMON_SCHEMA_FAILURE, payload: error }))
}

export default getSchema
