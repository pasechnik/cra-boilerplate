import {
  DEPOSIT_DATA_REQUEST,
  DEPOSIT_DATA_SUCCESS,
  DEPOSIT_DATA_ERROR,
  FETCH_DATA_ERROR,
  FETCH_DATA_SETTINGS_REQUEST,
  FETCH_DATA_SETTINGS_SUCCESS,
} from '../../actions/consts'
import { consts } from './consts'
import initial from './initial'
import { obj } from '../../utils/object'
import { str } from '../../utils/string'

const coockieCurrency = str.getCookie('currency')

export const actionHandlers = {
  [FETCH_DATA_SETTINGS_REQUEST]: state => ({
    ...state,
    fetching: true,
  }),
  [FETCH_DATA_SETTINGS_SUCCESS]: (state, action) => {
    const { lang, country_by_ip, selectedCountry, country_phone_prefix, EntroPay } = action.payload
    return {
      ...state,
      fetching: false,
      lang: {
        ...state.lang,
        ...lang,
      },
      MT4AccountNumber: obj.deepGet(action, ['payload', 'accountInfo', 'accounts', 0, 'account'], null),
      selectedCountry: selectedCountry || country_by_ip || country_phone_prefix.selected || state.selectedCountry || state.country_by_ip,
      country_by_ip,
      EntroPay,
      country_phone_prefix,
    }
  },
  [FETCH_DATA_ERROR]: state => ({
    ...state,
    fetching: false,
  }),

  [DEPOSIT_DATA_REQUEST]: state => ({
    ...state,
    fetching: true,
  }),
  [DEPOSIT_DATA_SUCCESS]: (state, action) => {
    return {
      ...state,
      fetching: false,
      response: {
        ...action.payload,
        status: action.payload.status || false,
        url: action.payload.the3d_url || action.payload.APM_url,
        form: action.payload.the3d_form || action.payload.APM_form || null,
        params: action.payload.the3d_params || action.payload.APM_Params || null,
        target: action.payload.target === 'self' ? '_self' : action.payload.target,
        redirect_url: action.payload.success_url || action.payload.seccess_url,
      },
    }
  },
  [DEPOSIT_DATA_ERROR]: state => ({
    ...state,
    fetching: false,
  }),

  [consts.FETCH_NEW_ACCOUNT]: (state, action) => ({
    ...state,
    accountInfo: {
      ...state.accountInfo,
      MT4AccountNumber: parseInt(action.payload, 10)
    },
    fetching: true,
  }),
  [consts.FETCH_NEW_ACCOUNT_SUCCESS]: (state, action) => {
    const { accountInfo, country_by_ip, selectedCountry, country_phone_prefix } = action.payload
    const amountConfig = {
      min_d: action.payload.min_d,
      max_d: action.payload.max_d,
      amount: action.payload.defaul_d || 0,
      currency: action.payload.currency && action.payload.currency !== 'undefined' ? action.payload.currency : coockieCurrency,
      defaul_d: action.payload.defaul_d,
      btn1_amount: action.payload.btn1_amount,
      btn2_amount: action.payload.btn2_amount,
      btn3_amount: action.payload.btn3_amount,
    }
    return {
      ...state,
      fetching: false,
      accountInfo: {
        ...accountInfo,
        MT4AccountNumber: obj.deepGet(action, ['payload', 'accountInfo', 'accounts', 0, 'account'], null),
        country_by_ip,
        selectedCountry: selectedCountry || country_by_ip || country_phone_prefix.selected,
        country_phone_prefix,
      },
      amountConfig,
    }
  },
  [consts.FETCH_NEW_ACCOUNT_FAILURE]: state => ({
    ...state,
    fetching: false,
  }),

  [consts.SET_COMMON_COUNTRY]: (state, action) => ({
    ...state,
    selectedCountry: action.payload,
    fetching: false,
  }),
  [consts.SET_COMMON_RESPONSE]: (state, action) => ({
    ...state,
    response: {
      ...action.payload,
    },
  }),
  [consts.SET_METHOD]: (state, action) => ({
    ...state,
    method: action.payload,
  }),

  [consts.FETCH_COUNTRIES]: state => ({
    ...state,
    fetching: true,
  }),
  [consts.FETCH_COUNTRIES_SUCCESS]: (state, action) => ({
    ...state,
    fetching: false,
    countries: obj.deepGet(action, ['payload', 'list'], []),
    selectedCountry: obj.deepGet(action, ['payload', 'selected'], ''),
  }),
  [consts.FETCH_COUNTRIES_FAILURE]: state => ({
    ...state,
    fetching: true,
  }),
}

export const reducers = (state = initial, action) => {
  const handler = actionHandlers[action.type]
  return handler ? handler(state, action) : state
}

export default reducers
