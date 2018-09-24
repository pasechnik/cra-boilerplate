import { RSAA } from 'redux-api-middleware'
import config from '../config'
import { consts } from '../consts'

const url = config.generalSettingsFront

const fetchSettings = value => (dispatch, store) => dispatch({
  [RSAA]: {
    endpoint: url,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    types: [
      consts.FETCH_GENERAL_SETTINGS,
      consts.FETCH_GENERAL_SETTINGS_SUCCESS,
      consts.REQUEST_GENERAL_SETTINGS_FAILURE,
    ],
  },
})

export default fetchSettings
