import fetch from 'isomorphic-fetch'
import APPCONFIG from '../config'
import { consts } from '../consts'

const url = APPCONFIG.newDepositURL

const openEntroPay = data => dispatch => {
  let urlEncodedData = ''
  const urlEncodedDataPairs = []
  let name

  for (name in data) {
    urlEncodedDataPairs.push(`${encodeURIComponent(name)}=${encodeURIComponent(data[name])}`)
  }

  urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+')

  dispatch({ type: consts.NEW_DEPOSIT })
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    },
    body: urlEncodedData,
    credentials: 'same-origin',
  })
    .then(response => response.json())
    .then(json => {
      dispatch({ type: consts.NEW_DEPOSIT_SUCCESS, payload: json })
    })
    .catch(error => dispatch({ type: consts.NEW_DEPOSIT_FAILURE, payload: error }))
}

export default openEntroPay
