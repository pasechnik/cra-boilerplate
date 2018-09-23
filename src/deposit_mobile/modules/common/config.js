import { str } from '../../utils/string'

const ENV = process.env.NODE_ENV
const BRAND = process.env.BRAND || 'clean'
const NOTIFICATION = BRAND !== 'trademy'
const GA = BRAND === 'trademy'

const date = new Date()
const year = date.getFullYear()
const month = date.getMonth() + 1

const customerId = str.getCookie('customerId')

const courseInfo = {
  currency: BRAND === 'trademy' ? localStorage.getItem('currency') : null,
  courseId: BRAND === 'trademy' ? localStorage.getItem('courseId') : null,
  amount: BRAND === 'trademy' ? localStorage.getItem('amount') : null,
  MT4AccountNumber: BRAND === 'trademy' ? localStorage.getItem('MT4AccountNumber') : customerId,
  email: BRAND === 'trademy' && localStorage.getItem('email') ? localStorage.getItem('email') : false,
}

const CLEAR = {
  newDepositAPM_URL: ENV === 'production' || ENV === 'development' ? '/mzc.php?action=mz_cashier_apm_deposit' : 'http://localhost:4004/mz_cashier_apm_deposit',
  newDepositURL: ENV === 'production' || ENV === 'development' ? '/mzc.php?action=mz_cashier_deposit' : 'http://localhost:4004/mz_cashier_deposit',
  generalSettingsFront: ENV === 'production' || ENV === 'development' ? '/mzc.php?action=mz_cashier_get_general_settings_front' : 'http://localhost:4004/mz_cashier_get_general_settings_front',
  fetchNewAccount: ENV === 'production' || ENV === 'development' ? '/mzc.php?action=mz_cashier_get_general_settings_front' : 'http://localhost:4004/getNewAccountSettings',
  fetchCountriesURL: ENV === 'production' || ENV === 'development' ? '/mzc.php?action=mz_cashier_get_countries' : 'http://localhost:4004/mz_cashier_get_countries',
  fetchPagoCountriesURL: ENV === 'production' || ENV === 'development' ? '/mzc.php?action=mz_cashier_get_pago_countries' : 'http://localhost:4004/mz_cashier_get_pago_countries',
  fetchExistingCardsURL: ENV === 'production' || ENV === 'development' ? '/mzc.php?action=mz_cashier_get_existing_cards' : 'http://localhost:4004/mz_cashier_get_existing_cards',
  getNewAddressUrl: ENV === 'production' || ENV === 'development' ? '/include/blockio/get_new_address.php' : 'http://localhost:4004/get_new_address',
  customerId,
  courseInfo,
  BRAND,
  year,
  month,
  NOTIFICATION,
  GA,
}

const COURSE_CONFIG = {
  newDepositAPM_URL: ENV === 'production' || ENV === 'development' ? '/mzc.php?action=mz_cashier_apm_deposit' : 'http://localhost:4004/mz_cashier_apm_deposit',
  newDepositURL: ENV === 'production' || ENV === 'development' ? '/mzc.php?action=mz_cashier_deposit' : 'http://localhost:4004/mz_cashier_deposit',
  generalSettingsFront: ENV === 'production' || ENV === 'development' ? '/wp-content/plugins/mz-cashier/settings.json' : 'http://localhost:4004/mz_cashier_get_general_settings_front',
  fetchCountriesURL: ENV === 'production' || ENV === 'development' ? '/wp-content/plugins/mz-cashier/countries.json' : 'http://localhost:4004/mz_cashier_get_countries',
  courseInfo,
  customerId,
  BRAND,
  year,
  month,
  NOTIFICATION,
  GA,
}

const config = BRAND === 'trademy' ? COURSE_CONFIG : CLEAR

export default config
