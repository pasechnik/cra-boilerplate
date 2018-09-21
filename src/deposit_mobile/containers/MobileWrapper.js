import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import creditCardType from 'credit-card-type'
import FundsSection from '../components/FundsSection'
// import CardTypeSection from '../components/CardTypeSection'
import CardInfoSection from '../components/CardInfoSection'
import CardHolderInfoSection from '../components/CardHolderInfoSection'
import CardSubmitSection from '../components/CardSubmitSection'
import {
  dataRequest,
  depositRequest,
  itemChange,
} from '../actions'
import { goToDispatch as fGoTo } from '../actions/goTo'

import '../style.css'

class MobileWrapper extends Component {
  static propTypes = {
    accountInfo: PropTypes.shape({}).isRequired,
    deposit: PropTypes.shape({
      status: PropTypes.string,
      success: PropTypes.bool,
      the3d_params: PropTypes.shape({
        popupWindow: PropTypes.object,
        PaReq: PropTypes.string,
        MD: PropTypes.string,
        sendMethod: PropTypes.string,
      }),
      seccess_url: PropTypes.string,
      the3d_url: PropTypes.string,
      err: PropTypes.string,
      iframeSrc: PropTypes.string,
    }).isRequired,
    doItemChange: PropTypes.func.isRequired,
    doDataRequest: PropTypes.func.isRequired,
    doDepositRequest: PropTypes.func.isRequired,
    goTo: PropTypes.func.isRequired,
  }

  state = {
    // cardType: '',
    cardNumber: '',
    cvv: '',
    firstLoad: {
      number: false,
      cvv: false,
      date: false,
    },
  }

  componentDidMount() {
    const {
      doDataRequest,
      goTo,
    } = this.props

    setTimeout(() => doDataRequest(), 0)
    // doDataRequest()

    window.success3DSecureCallback = () => {
      if (window.mz_cashier_3d_sec_frame !== undefined) {
        window.mz_cashier_3d_sec_frame.close()
      }
      console.log('success')
      // goTo('/success')
      setTimeout(() => goTo('/success'), 100)
    }
    window.fail3DSecureCallback = () => {
      if (window.mz_cashier_3d_sec_frame !== undefined) {
        window.mz_cashier_3d_sec_frame.close()
      }
      console.log('error')
      // goTo('/error')
      setTimeout(() => goTo('/error'), 100)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { goTo } = this.props
    const {
      success,
    } = nextProps.d3Data

    if (success === false) {
      setTimeout(() => goTo('/error'), 50)
    } else {
      this.setState({
        cardNumber: nextProps.accountInfo.credit_card_number,
        cvv: nextProps.accountInfo.exp_date_cvv,
      })
    }

    // if (success === true && status === 'Pending') {
    // if ((target === 'iframe' || target === 'popup' || target === 'self') && the3d_url !== '') {
    //   this.props.send3DVarification(nextProps.deposit)
    //   this.openWindowWithPost(the3d_url, the3d_params)
    // } else if (target === 'iframe' && the3d_form !== '') {
    //   this.setState({
    //     form: the3d_form,
    //     modal: true,
    //   })
    // } else if (addDepositData !== '') {
    //   console.log({ addDepositData })
    // }
    // } else if (success === false) {
    //   setTimeout(() => goTo('/error'), 50)
    // } else {
    //   this.setState({
    //     cardNumber: nextProps.accountInfo.credit_card_number,
    //     cvv: nextProps.accountInfo.exp_date_cvv,
    //   })
    // }
  }

  onSelectChange = (event, name) => {
    const { firstLoad } = this.state
    const { doItemChange, accountInfo } = this.props
    doItemChange({
      ...accountInfo,
      [name]: event.target.value,
    })
    this.setState({
      firstLoad: {
        ...firstLoad,
        date: false,
      },
    })
  }

  onTextChange = (event, name) => {
    const { doItemChange, accountInfo } = this.props
    const { firstLoad } = this.state

    if (name === 'credit_card_number') {
      this.validateCardNumber(event.target.value, name)
    } else if (name === 'exp_date_cvv') {
      if (event.target.value < 4) {
        doItemChange({
          ...accountInfo,
          [name]: event.target.value,
        })
        this.setState({
          firstLoad: {
            ...firstLoad,
            cvv: false,
          },
          cvv: event.target.value,
        })
      } else {
        doItemChange({
          ...accountInfo,
          [name]: event.target.value.slice(0, 3),
        })
        this.setState({
          firstLoad: {
            ...firstLoad,
            cvv: false,
          },
          cvv: event.target.value.slice(0, 3),
        })
      }
    } else {
      doItemChange({
        ...accountInfo,
        [name]: event.target.value,
      })
    }
  }

  onDepositChange = (slideNumber) => {
    const { doItemChange, accountInfo } = this.props
    const amount = 200 + (parseInt(slideNumber, 10) * 50)
    doItemChange({
      ...accountInfo,
      amount,
    })
  }

  validateCardNumber = (number, name) => {
    const { doItemChange, accountInfo } = this.props
    const { firstLoad } = this.state
    const cardType = (creditCardType(number)[0] !== undefined && number.length !== 0)
      ? creditCardType(number)[0].niceType === 'Mastercard' ? 'MasterCard' : creditCardType(number)[0].niceType
      : ''
    this.setState({
      cardType,
      firstLoad: {
        ...firstLoad,
        number: false,
      },
      cardNumber: number.slice(0, 16),
    })
    const newAccountInfo = number.length < 17
      ? {
        ...accountInfo,
        [name]: number,
        cardType,
      }
      : {
        ...accountInfo,
        [name]: number.slice(0, 16),
        cardType,
      }
    doItemChange(newAccountInfo)
  }

  validateFields = () => {
    const { cardNumber, cvv } = this.state
    if (cardNumber.length === 16 && cvv.length === 3) {
      return true
    }
    return false
  }

  validateDate = () => {
    const { accountInfo: { exp_date_month, exp_date_year } } = this.props
    const thisDate = new Date()
    const cardDate = new Date(exp_date_year, exp_date_month - 1)
    const cardM = cardDate.getMonth()
    const cardY = cardDate.getFullYear()
    const nowM = thisDate.getMonth()
    const nowY = thisDate.getFullYear()
    const result = thisDate < cardDate || (cardM === nowM && cardY === nowY)
    return result
  }

  handleDepositSend = () => {
    const { doDepositRequest, accountInfo } = this.props
    this.setState({
      firstLoad: {
        cardNumber: false,
        cvv: false,
      },
    })
    if (this.validateFields() && this.validateDate()) {
      doDepositRequest(accountInfo)
    }
  }

  render() {

    const {
      accountInfo,
      settings: { max_d, currency },
      deposit: {
        err,
        status,
        success,
        iframeSrc,
        // the3d_params, the3d_url, seccess_url, force_new_cc,
      },
      loading,
    } = this.props
    const {
      firstLoad,
      cardNumber,
      cvv,
      // cardType,
    } = this.state

    return (
      loading
        ? (
          <div className='loader-wrapper'>
            <div id='loader'>
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
        )
        : (
          <div id='deposit_mobile'>
            <div className='deposit-mobile-wrapper'>
              <FundsSection
                onDepositChange={this.onDepositChange}
                maxDeposit={max_d}
                currency={currency}
              />
              {/* <CardTypeSection cardType={cardType} /> */}
              <CardInfoSection
                cardNumber={cardNumber}
                cvv={cvv}
                validateDate={this.validateDate}
                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
                firstLoad={firstLoad}
                accountInfo={accountInfo}
              />
              <CardHolderInfoSection
                accountInfo={accountInfo}
                onTextChange={this.onTextChange}
              />
              <CardSubmitSection
                handleDepositSend={this.handleDepositSend}
              />
            </div>

          </div>
        )
    )
  }
}

const mapStateToProps = state => ({
  settings: state.deposit.data.settings || {},
  accountInfo: state.deposit.data.accountInfo || {},
  d3Data: state.deposit.deposit.d3_data || {},
  loading: state.deposit.data.isLoading,
  deposit: state.deposit.common.deposit,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  doDataRequest: dataRequest,
  doDepositRequest: depositRequest,
  doItemChange: itemChange,
  goTo: fGoTo,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MobileWrapper)
