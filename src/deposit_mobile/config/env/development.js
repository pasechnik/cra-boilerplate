const host = 'http://localhost:4060/v1/mzc/'
export default {
  env: 'development',
  api: {
    newDepositURL: process.env.REACT_APP_NEW_DEPOSIT_URL || `${host}mz_cashier_deposit`,
    generalSettingsFront:
      process.env.REACT_APP_GENERAL_SETTINGS_FRONT || `${host}mz_cashier_get_general_settings_front`,
    fetchNewAccount: process.env.REACT_APP_FETCH_NEW_ACCOUNT || `${host}getNewAccountSettings`,
    fetchCountriesURL: process.env.REACT_APP_FETCH_COUNTRIES_URL || `${host}mz_cashier_get_countries`,
    fetchPagoCountriesURL: process.env.REACT_APP_FETCH_PAGO_COUNTRIES_URL || `${host}mz_cashier_get_pago_countries`,
    fetchExistingCardsURL: process.env.REACT_APP_FETCH_EXISTING_CARDS_URL || `${host}mz_cashier_get_existing_cards`,
    getNewAddressUrl: process.env.REACT_APP_GET_NEW_ADDRESS_URL || `${host}get_new_address`,
  },
}
