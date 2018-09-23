import fetch from 'isomorphic-fetch'
import APPCONFIG from '../config'
import { consts } from '../consts'

const url = APPCONFIG.fetchCountriesURL

const fetchCountries = value => (dispatch) => {
  dispatch({ type: consts.FETCH_COUNTRIES })
  fetch(url, {
    method: 'GET',
    credentials: 'include',
  }).then(response => response.json())
    .then(json => dispatch({ type: consts.FETCH_COUNTRIES_SUCCESS, payload: json }))
    .catch(error => dispatch({ type: consts.FETCH_COUNTRIES_FAILURE, payload: error }))
}

export default fetchCountries
