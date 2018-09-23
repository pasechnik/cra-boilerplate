import { RSAA } from 'redux-api-middleware'
import config from '../../common/config'
import { consts } from '../consts'

const url = config.generalSettingsFront

const fetchSettings = value => (dispatch, store) => {
  return dispatch({
    [RSAA]: {
      endpoint: url,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      types: [
        consts.FETCH_GENERAL_SETTINGS,
        consts.FETCH_GENERAL_SETTINGS_SUCCESS,
        consts.REQUEST_GENERAL_SETTINGS_FAILURE
      ],
    },
  })
}

export default fetchSettings
