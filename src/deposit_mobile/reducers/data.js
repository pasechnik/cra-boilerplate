import get from 'lodash/get'
import {
  DEPOSIT_DATA_REQUEST,
  DEPOSIT_DATA_SUCCESS,
  FETCH_DATA_SETTINGS_REQUEST,
  FETCH_DATA_SETTINGS_SUCCESS,
  FETCH_DATA_ERROR,
  ITEM_CHANGE,
} from '../actions/consts'

const now = new Date()
const initialState = {
  settings: {
    lang: {
      mz_cashier_cc_deposit_form: 'Credit Card',
      mz_cashier_amount_title: 'Amount',
      mz_cashier_other_amount: 'Other Amount',
      mz_cashier_card_info_title: 'Card Information',
      mz_cashier_card_num: 'Credit Card Number',
      mz_cashier_card_type: 'Card Type',
      mz_cashier_exp_month: 'Expiration  Date',
      mz_cashier_month: 'Month',
      mz_cashier_year: 'Year',
      mz_cashier_cc_holder_title: 'Credit Card Holder Info',
      mz_cashier_country_combo: 'Country',
      mz_cashier_first_name: 'First Name',
      mz_cashier_last_name: 'Last Name',
      mz_cashier_address: 'Address',
      mz_cashier_city: 'City',
      mz_cashier_email: 'Email',
      mz_cashier_postcode: 'Postal Code',
      mz_cashier_phone: 'Phone',
      mz_cashier_submit: 'Deposit',
      mz_cashier_deposit_failed: 'Something went wrong',
      mz_cashier_deposit_failed2: 'Deposit Failed',
      mz_cashier_existing_cards: 'Existing Cards',
      mz_cashier_select_existing_cards: 'Select Existing Card',
      mz_cashier_select_mode: 'Select Mode',
      mz_cashier_new_card: 'New Card',
      mz_cashier_loading: 'Loading',
      mz_cashier_force_new_cc:
        'Dear Customer,As an additional security level, your transaction will be processed ' +
        'using 3D secure measure. Please complete as described in the following page',
      mz_cashier_apm_tab_title: 'E-Wallet',
      mz_cashier_lpm_tab_title: 'Local Payment Method',
      mz_cashier_apm_choose_title: 'Payment Method (Choose one)',
      mz_cashier_customer_info: 'Customer Info',
      mz_cashier_apm_account: 'APM Account',
      mz_cashier_validation_cc: 'Credit Card Number is Required',
      mz_cashier_validation_cc2: 'Invalid CC Type or Number',
      mz_cashier_validation_cvv: 'CVV is Required',
      mz_cashier_validation_expiration: 'Expiration date has Passed',
      mz_cashier_validation_country: 'Country is Required',
      mz_cashier_validation_country2: 'Service unavailable in your area',
      mz_cashier_validation_name: 'Name is Required',
      mz_cashier_validation_name2: 'At least 3 letters',
      mz_cashier_validation_address: 'Address is Required',
      mz_cashier_validation_address2: 'At least 5 characters',
      mz_cashier_validation_city: 'City is Required',
      mz_cashier_validation_city2: 'At least 3 characters',
      mz_cashier_validation_post: 'Postal Code is Required',
      mz_cashier_validation_post2: 'At least 2 characters',
      mz_cashier_validation_phone: 'Phone is Required',
      mz_cashier_validation_phone2: 'At least 8 digits',
      mz_cashier_not_valid_credit_card:
        'This is not a valid Credit Card.  Please check your CARD TYPE' + ' and NUMBER and try again.',
      mz_cashier_not_valid_credit_card_type: 'Card type not supported',
      mz_cashier_ssl_tooltip: 'This is a secure 256-bit SSL Encrypted payment. You are safe',
      mz_cashier_cvv_tooltip: 'The last 3 digits displayed on the back of your card',
      mz_cashier_cvv_not_valid: 'At least 3 digits',
      mz_cashier_max_amount_tooltip: 'This is the maximum amount for a single deposit',
      mz_cashier_min_amount_tooltip: 'This is the minimum amount for a single deposit',
      mz_cashier_footer_disclaimer:
        'Some credit cards require 3D verification.<br/>In such case, ' +
        'contact your bank for receving the verification code',
      mz_cashier_ok: 'OK',
      mz_cashier_not_valid_exp_date: 'Expiration date has Passed',
      mz_cashier_choose_account: 'Account Number',
      mz_cashier_wire_tab_title: 'Wire Transfer',
      mz_cashier_wire_account_details: 'Account Details',
      mz_cashier_wire_details_description:
        'Please deposit to the following bank account details.<br/>' +
        'Once funds are received, it will be credited to your trading account.',
      mz_cashier_netteler_email: 'Account ID or E-mail Address',
      mz_cashier_netteler_id: 'Secure ID or Authentication Code',
      mz_cashier_popup_accountType_title: 'Complete your choice',
      mz_cashier_popup_accountType_body:
        'Deposit {amount}{currency} or more and one of our representatives ' +
        'will contact you to grand you your benefits',
      mz_cashier_popup_3d_verification:
        'Please note that all deposits above 1,000 USD will go through 3D Secure' +
        ' verification, which is an additional security layer for online credit and debit card transactions ' +
        'designed to protect cardholders and prevent fraudulent transactions. You will be asked to input either ' +
        'a one-time password being sent to your mobile phone or email, or a fixed password that had been provided ' +
        'to you in the past by your issuing bank',
      mz_cashier_popup_blocked_ip: 'Deposit is not allowed from your country',
      mz_cashier_choose_bank: 'Select Bank',
      mz_cashier_pid: 'Personal ID',
      mz_cashier_input_cc: 'Input credit card data',
      mz_cachier_arm_vload_error_format: 'Incorrect Format',
      mz_cachier_arm_vload_pin: 'PIN',
      mz_cachier_arm_vload_buy_voucher: 'Buy Voucher',
      mz_cachier_currency_title: 'Currency',
      mz_cachier_amountError_text: 'The amount must be a multiple of 10, minimum amount is',
      mz_cachier_cancel_title: 'Cancel',
      mz_cachier_arm_vload_text:
        'Make a hassle-free payment Learn more about VLoad or buy a [EUR / USD]' + ' voucher at vload.expert.',
      mz_cashier_lang: 'EN',
    },
    ltr: 1,
    currency: 'USD',
    defaul_d: 1000,
    min_d: 250,
    max_d: 20000,
    btn1_amount: 250,
    btn2_amount: 500,
    btn3_amount: 750,
    currency_align: 'left',
    apm: [],
    bankTransfer: [],
    wireTransfer: [],
    country_phone_prefix: {},
    crm_type: undefined,
    country_by_ip: undefined,
    EntroPay: {},
    show_bitcoin_mobile: 'off',
  },
  accountInfo: {
    FIRSTNAME: '',
    LASTNAME: '',
    PHONE: '',
    STREET: '',
    HOUSENUMBER: '',
    POSTCODE: '',
    CITY: '',
    accounts: [
      {
        account: 0,
        currency: 'USD',
        accountBalance: 0,
      },
    ],
    credit_card_number: '4742740000064002',
    exp_date_cvv: '100',
    isEmailValid: true,
    isIpAllowed: true,
    email: '',
    Country: '',
    currency: 'USD',
    amount: 0,
    exp_date_month: '11',
    exp_date_year: '2018',
    mode: 'NewCard',
    cardType: 'Visa',
  },
  firstLoad: {
    number: true,
    cvv: true,
    date: true,
  },
  isLoading: false,
  errors: [],
}

export const actionHandlers = {
  [FETCH_DATA_SETTINGS_REQUEST]: state => ({
    ...state,
    isLoading: true,
  }),
  [DEPOSIT_DATA_REQUEST]: state => ({
    ...state,
    isLoading: true,
  }),
  [DEPOSIT_DATA_SUCCESS]: state => ({
    ...state,
    isLoading: false,
  }),
  [FETCH_DATA_ERROR]: (state, action) => ({
    ...state,
    isLoading: false,
    errors: action.payload,
  }),
  [FETCH_DATA_SETTINGS_SUCCESS]: (state, action) => ({
    ...state,
    isLoading: false,
    settings: action.payload !== null ? action.payload : '',
    accountInfo:
      action.payload !== null
        ? {
            ...action.payload.accountInfo,
            Country: action.payload.country_by_ip,
            currency: action.payload.currency,
            amount: 50,
            exp_date_month: get(action, 'payload.accountInfo.exp_date_month', now.getMonth()),
            exp_date_year: get(action, 'payload.accountInfo.exp_date_year', now.getFullYear()),
            mode: 'NewCard',
            cardType: 'Visa',
          }
        : '',
  }),
  [ITEM_CHANGE]: (state, action) =>
    action.payload === undefined
      ? state
      : {
          ...state,
          accountInfo: {
            ...state.accountInfo,
            ...action.payload.accountInfo,
          },
          firstLoad: {
            ...state.firstLoad,
            ...action.payload.firstLoad,
          },
        },
}

const reducers = (state = initialState, action) => {
  const handler = actionHandlers[get(action, 'type', 'default')]
  return handler ? handler(state, action) : state
}

export default reducers
