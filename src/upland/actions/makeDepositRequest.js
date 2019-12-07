import { obj } from 'the-utils'
import { DEPOSIT_DATA_REQUEST, DEPOSIT_DATA_SUCCESS } from './consts'

const mapData = data => {
  // console.log('data=', data)
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
  const payloadDefault = {
    MT4AccountNumber: data.accounts[0].account,
    currency: data.accounts[0].currency,
    action: 'mz_cashier_deposit',
    amount: 250,
  }

  const { HOUSENUMBER, POSTCODE, STREET, accounts, email, isEmailValid, isIpAllowed, ...payloadToSend } = Object.keys(
    data,
  ).reduce(
    (result, item) => ({
      ...result,
      [obj.get(mapItems, item, item)]: data[item],
    }),
    payloadDefault,
  )
  // delete payloadToSend.HOUSENUMBER
  // delete payloadToSend.POSTCODE
  // delete payloadToSend.STREET
  // delete payloadToSend.accounts
  // delete payloadToSend.email
  // delete payloadToSend.isEmailValid
  // delete payloadToSend.isIpAllowed
  // console.log(payloadToSend)

  return payloadToSend
}

export function makeDepositRequest(data) {
  const payload = mapData(data)
  return {
    type: DEPOSIT_DATA_REQUEST,
    payload,
  }
}

export function makeDepositRequestSucceed(payload) {
  return {
    type: DEPOSIT_DATA_SUCCESS,
    payload,
  }
}
