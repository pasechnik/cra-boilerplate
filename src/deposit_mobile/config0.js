import { str } from './utils/string'

const date = new Date()
const year = date.getFullYear()
const month = date.getMonth() + 1

const customerId = str.getCookie('customerId')
const ENV = process.env.NODE_ENV
const APPCONFIG = {
  // newDepositURL: ENV === 'production' || ENV === 'development' ? '/mzc.php?action=mz_cashier_deposit' : 'http://localhost:4004/mz_cashier_deposit',
  newDepositURL: ENV === 'production' ? '/mzc.php?action=mz_cashier_deposit' : 'http://localhost:4060/v1/mzc/mz_cashier_deposit',
  // generalSettingsFront: ENV === 'production' || ENV === 'development' ? '/mzc.php?action=mz_cashier_get_general_settings_front' : 'http://localhost:4004/mz_cashier_get_general_settings_front',
  generalSettingsFront: ENV === 'production' ? '/mzc.php?action=mz_cashier_get_general_settings_front' : 'http://localhost:4060/v1/mzc/mz_cashier_get_general_settings_front/?_dc=1536524325635',
  fetchNewAccount: ENV === 'production' || ENV === 'development' ? '/mzc.php?action=mz_cashier_get_general_settings_front' : 'http://localhost:4004/getNewAccountSettings',
  fetchCountriesURL: ENV === 'production' || ENV === 'development' ? '/mzc.php?action=mz_cashier_get_countries' : 'http://localhost:4060/v1/mzc/mz_cashier_get_countries',
  fetchPagoCountriesURL: ENV === 'production' || ENV === 'development' ? '/mzc.php?action=mz_cashier_get_pago_countries' : 'http://localhost:4060/v1/mzc/mz_cashier_get_pago_countries',
  fetchExistingCardsURL: ENV === 'production' || ENV === 'development' ? '/mzc.php?action=mz_cashier_get_existing_cards' : 'http://localhost:4060/v1/mzc/mz_cashier_get_existing_cards',
  getNewAddressUrl: ENV === 'production' || ENV === 'development' ? '/include/blockio/get_new_address.php' : 'http://localhost:4004/get_new_address',
  customerId,
  year,
  month,
}

export default APPCONFIG
