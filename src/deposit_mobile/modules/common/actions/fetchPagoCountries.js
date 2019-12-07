import fetch from 'isomorphic-fetch'
import APPCONFIG from '../config'
import { consts } from '../consts'

const url = APPCONFIG.fetchPagoCountriesURL

const fetchPagoCountries = () => dispatch => {
  dispatch({ type: consts.FETCH_PAGO_COUNTRIES })
  fetch(url, {
    method: 'GET',
    credentials: 'same-origin',
  })
    .then(response => response.json())
    .then(json => dispatch({ type: consts.FETCH_PAGO_COUNTRIES_SUCCESS, payload: json }))
    .catch(error => dispatch({ type: consts.FETCH_PAGO_COUNTRIES_FAILURE, payload: error }))
}

export default fetchPagoCountries
