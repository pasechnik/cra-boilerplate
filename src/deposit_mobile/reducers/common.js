import get from 'lodash/get'
import { SET_MODAL, SET_MODAL_SUCCESS, SET_MODAL_FAILURE } from '../actions/consts'
import { consts } from '../consts'

const initialState = {
  modal: {
    params: {},
    url: undefined,
    show: false,
    status: '',
    method: 'GET',
  },
  deposit: false,
  deposit_data: {},
}

export const actionHandlers = {
  // [consts.FETCH_GENERAL_SETTINGS]: (state, action) => ({
  //   ...state,
  //   fetching: true,
  // }),
  // [consts.FETCH_GENERAL_SETTINGS_SUCCESS]: (state, action) => {
  //   let settings = get(action, ['payload'], {})
  //   const defaultAmount = get(action, ['payload', 'defaul_d'], 1)
  //   const mt4account = get(action, ['payload', 'accountInfo', 'accounts', 0, 'account'], null)
  //   const coockieCurrency = str.getCookie('currency')
  //  // special parse for PAGO Bank
  //   if (settings.apm !== undefined && arr.isArray(settings.apm) && settings.apm.length > 0) {
  //     settings.apm.map((bank, i) => {
  //       if (obj.isObject(bank.enabledFields)) {
  //         let enabledFieldsToArr = []
  //         let mz_cashier_pago_banks = bank.enabledFields.mz_cashier_pago_banks
  //         let mz_cashier_pago_custom_pid = bank.enabledFields.mz_cashier_pago_custom_pid
  //         Object.keys(bank.enabledFields).map((field) => {
  //           if (obj.isObject(bank.enabledFields[field])) {
  //             enabledFieldsToArr.push(field)
  //           } else {
  //             enabledFieldsToArr.push(bank.enabledFields[field])
  //           }
  //         })
  //         settings.apm[i].enabledFields = enabledFieldsToArr
  //         settings.apm[i].mz_cashier_pago_banks = mz_cashier_pago_banks
  //         settings.apm[i].mz_cashier_pago_custom_pid = mz_cashier_pago_custom_pid
  //       }
  //     })
  //   }
  //   settings.MT4AccountNumber = mt4account !== undefined ? mt4account : ''
  //   settings.currency = settings.currency === undefined || settings.currency === 'undefined' || settings.currency === '' ? coockieCurrency : settings.currency
  //   return {
  //     ...state,
  //     fetching: false,
  //     amount: defaultAmount,
  //     amountStatus: defaultAmount >= action.payload.min_d && defaultAmount <= action.payload.max_d,
  //     settings,
  //   }
  // },
  // [consts.REQUEST_GENERAL_SETTINGS_FAILURE]: (state, action) => ({
  //   ...state,
  //   fetching: true,
  // }),
  // [consts.NEW_DEPOSIT]: (state, action) => ({
  //   ...state,
  //   fetching: true,
  // }),
  // [consts.NEW_DEPOSIT_SUCCESS]: (state, action) => {
  //   return {
  //     ...state,
  //     fetching: action.payload.status === 'Pending',
  //     deposit: {
  //       ...action.payload,
  //     },
  //   }
  // },
  // [consts.NEW_DEPOSIT_FAILURE]: (state, action) => ({
  //   ...state,
  //   fetching: false,
  // }),
  //
  // [consts.SET_DEPOSIT_DATA]: (state, action) => ({
  //   ...state,
  //   deposit_data: action.payload,
  // }),
  [SET_MODAL]: (state, action) => ({
    ...state,
    modal: {
      ...state.modal,
      show: action.payload.show,
    },
  }),
  [SET_MODAL_SUCCESS]: (state, action) => {
    const data = action.payload
    let url = data.the3d_url
    let urlArr = url.split('?')
    let params = ''
    let method = 'POST'

    if (urlArr[1] !== undefined && urlArr[1] !== '') {
      url = urlArr[0]
      params = urlArr[1]
      method = 'GET'
      if (data.the3d_params.sendMethod !== undefined && data.the3d_params.sendMethod === 'post') {
        delete data.the3d_params.sendMethod
        url = data.the3d_url
        params = data.the3d_params !== undefined ? data.the3d_params : ''
        method = 'POST'
      }
    } else {
      params = data.the3d_params !== undefined ? data.the3d_params : ''
    }

    return {
      ...state,
      modal: {
        ...state.modal,
        show: true,
        url,
        params,
        method,
        status: data.status,
      },
    }
  },
  [consts.SET_MODAL_FAILURE]: (state, action) => ({
    ...state,
    show: false,
  }),

  [consts.FETCH_NEW_ACCOUNT]: (state, action) => ({
    ...state,
    fetching: true,
    settings: {
      ...state.settings,
      MT4AccountNumber: parseInt(action.payload, 10),
    },
  }),
  [consts.FETCH_NEW_ACCOUNT_SUCCESS]: (state, action) => {
    const defaultAmount = get(action, ['payload', 'defaul_d'], 1)
    return {
      ...state,
      fetching: false,
      amount: defaultAmount,
      amountStatus: true,
      settings: { ...state.settings, ...get(action, ['payload'], {}) },
    }
  },
  [consts.FETCH_NEW_ACCOUNT_FAILURE]: (state, action) => ({
    ...state,
    fetching: false,
  }),

  [consts.SET_COMMON_AMOUNT]: (state, action) => {
    const value = action.payload
    return {
      ...state,
      amount: value,
      amountStatus: value >= state.settings.min_d && value <= state.settings.max_d,
      fetching: false,
    }
  },
  [consts.SET_LOADING]: (state, action) => {
    return {
      ...state,
      fetching: action.payload,
    }
  },
  [consts.SET_COMMON_COUNTRY]: (state, action) => ({
    ...state,
    selectedCountry: action.payload,
    fetching: false,
  }),
  [consts.SET_PAGO_COUNTRY]: (state, action) => ({
    ...state,
    selectedPagoCountry: action.payload,
    selectedCountry: action.payload,
    fetching: false,
  }),

  [consts.FETCH_COUNTRIES]: (state, action) => ({
    ...state,
    fetching: true,
  }),
  [consts.FETCH_COUNTRIES_SUCCESS]: (state, action) => ({
    ...state,
    fetching: false,
    countries: get(action, ['payload', 'list'], []),
    selectedCountry: get(action, ['payload', 'selected'], ''),
  }),
  [consts.FETCH_COUNTRIES_FAILURE]: (state, action) => ({
    ...state,
    fetching: true,
  }),

  [consts.FETCH_PAGO_COUNTRIES]: (state, action) => ({
    ...state,
    fetching: true,
  }),
  [consts.FETCH_PAGO_COUNTRIES_SUCCESS]: (state, action) => ({
    ...state,
    fetching: false,
    pagoCountries: get(action, ['payload', 'list'], []),
    selectedPagoCountry: get(action, ['payload', 'selected'], ''),
  }),
  [consts.FETCH_PAGO_COUNTRIES_FAILURE]: (state, action) => ({
    ...state,
    fetching: true,
  }),

  [consts.FETCH_EXISTING_CARDS]: (state, action) => ({
    ...state,
    fetching: true,
  }),
  [consts.FETCH_EXISTING_CARDS_SUCCESS]: (state, action) => ({
    ...state,
    fetching: false,
    existingCards: get(action, ['payload'], []),
  }),
  [consts.FETCH_EXISTING_CARDS_FAILURE]: (state, action) => ({
    ...state,
    fetching: false,
  }),
}

const reducers = (state = initialState, action) => {
  const handler = actionHandlers[get(action, 'type', 'default')]
  return handler ? handler(state, action) : state
}

export default reducers
