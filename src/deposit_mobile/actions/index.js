import omit from 'lodash/omit'
import { createAction } from 'redux-actions'
import get from 'lodash/get'
import {
  CARDTYPE_CHANGE,
  DEPOSIT_DATA_REQUEST,
  DEPOSIT_DATA_SUCCESS,
  DEPOSIT_PENDING_ACTION,
  FETCH_DATA_SETTINGS_REQUEST,
  FETCH_DATA_SETTINGS_SUCCESS,
  ITEM_CHANGE,
  SET_MODAL,
} from './consts'

const mapItems = {
  CITY: 'City',
  PHONE: 'mobile',
  FIRSTNAME: 'FirstName',
  LASTNAME: 'LastName',
  credit_card_number: 'cardNum',
  exp_date_month: 'ExpMonth',
  exp_date_year: 'ExpYear',
  exp_date_cvv: 'CVV2/PIN',
}

const mapData = data => {
  const def = {
    MT4AccountNumber: data.accounts[0].account,
    currency: data.accounts[0].currency,
    action: 'mz_cashier_deposit',
    amount: 1,
  }

  const payload = Object.keys(data).reduce(
    (result, item) => ({
      ...result,
      [get(mapItems, item, item)]: data[item],
    }),
    def,
  )

  const payloadToSend = omit(payload, [
    'HOUSENUMBER',
    'POSTCODE',
    'STREET',
    'accounts',
    'email',
    'isEmailValid',
    'isIpAllowed',
  ])

  return payloadToSend
}

export const dataRequest = createAction(FETCH_DATA_SETTINGS_REQUEST)
export const dataRequestSucceed = createAction(FETCH_DATA_SETTINGS_SUCCESS)
export const itemChange = createAction(ITEM_CHANGE)
export const cardTypeChange = createAction(CARDTYPE_CHANGE)
export const depositPendingAction = createAction(DEPOSIT_PENDING_ACTION)
export const depositRequest = createAction(DEPOSIT_DATA_REQUEST, payload => mapData(payload))
export const depositRequestSucceed = createAction(DEPOSIT_DATA_SUCCESS)
export const send3DVarification = createAction(SET_MODAL)
