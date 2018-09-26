import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import creditCardType from 'credit-card-type'
import { Loading } from '../components/Loading'
import FundsSection from '../components/FundsSection'
// import CardTypeSection from '../components/CardTypeSection'
import CardInfoSection from '../components/CardInfoSection'
import CardHolderInfoSection from '../components/CardHolderInfoSection'
import CardSubmitSection from '../components/CardSubmitSection'
import DepositModal from '../modules/modal/containers/DepositModal'
import {
  dataRequest,
  depositRequest,
  itemChange,
} from '../actions'

import '../style.css'

class MobileWrapper extends Component {
  static propTypes = {
    settings: PropTypes.shape({}).isRequired,
    accountInfo: PropTypes.shape({}).isRequired,
    firstLoad: PropTypes.shape({
      number: PropTypes.bool,
      cvv: PropTypes.bool,
      date: PropTypes.bool,
    }).isRequired,
    response: PropTypes.shape({
      status: PropTypes.string,
      success: PropTypes.bool,
    }).isRequired,
    loading: PropTypes.bool.isRequired,
    doItemChange: PropTypes.func.isRequired,
    doDataRequest: PropTypes.func.isRequired,
    doDepositRequest: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const {
      doDataRequest,
    } = this.props

    setTimeout(() => doDataRequest(), 0)
  }

  onSelectChange = (event, name) => {
    const {
      doItemChange,
    } = this.props

    doItemChange({
      accountInfo: {
        [name]: event.target.value,
      },
      firstLoad: {
        date: false,
      },
    })
  }

  onTextChange = (event, name) => {
    const {
      doItemChange,
    } = this.props

    if (name === 'credit_card_number') {
      this.validateCardNumber(event.target.value, name)
    } else if (name === 'exp_date_cvv') {
      doItemChange({
        accountInfo: {
          [name]: event.target.value.length < 4 ? event.target.value : event.target.value.slice(0, 3),
        },
        firstLoad: { cvv: false },
      })
    } else {
      doItemChange({
        accountInfo: {
          [name]: event.target.value,
        },
      })
    }
  }

  onDepositChange = (slideNumber) => {
    const {
      doItemChange,
    } = this.props

    const amount = 200 + (parseInt(slideNumber, 10) * 50)
    doItemChange({
      accountInfo: {
        amount,
      },
    })
  }

  validateCardNumber = (number, name) => {
    const {
      doItemChange,
    } = this.props

    const type = creditCardType(number)
    const cardType = (number.length !== 0 && type[0] !== undefined) ? creditCardType(number)[0].niceType : ''

    const newAccountInfo = number.length < 17 ? {
      [name]: number,
      cardType,
    } : {
      [name]: number.slice(0, 16),
      cardType,
    }

    doItemChange({
      accountInfo: newAccountInfo,
      firstLoad: { number: false },
    })
  }

  validateFields = () => {
    const { accountInfo: { credit_card_number, exp_date_cvv } } = this.props
    if (credit_card_number.length === 16 && exp_date_cvv.length === 3) {
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
    const {
      accountInfo,
      doDepositRequest,
      doItemChange,
    } = this.props

    console.log('handleDepositSend')

    doItemChange({
      firstLoad: {
        cardNumber: false,
        cvv: false,
        date: false,
      },
    })

    if (this.validateFields() && this.validateDate()) {
      doDepositRequest(accountInfo)
    }
  }

  render() {
    const {
      accountInfo,
      firstLoad,
      loading,
      settings: { max_d, currency },
      response: { status, success },
    } = this.props

    const EmptyLoading = Loading(null)
    const PendingLoading = Loading(DepositModal)

    return (
      loading
        ? <EmptyLoading />
        : (
          <div id='deposit_mobile'>
            {success === true && status === 'Pending'
              ? <PendingLoading />
              : (
                <div className='deposit-mobile-wrapper'>
                  <FundsSection
                    onDepositChange={this.onDepositChange}
                    maxDeposit={max_d}
                    currency={currency}
                  />
                  {/* <CardTypeSection cardType={cardType} /> */}
                  <CardInfoSection
                    accountInfo={accountInfo}
                    firstLoad={firstLoad}
                    validateDate={this.validateDate}
                    onTextChange={this.onTextChange}
                    onSelectChange={this.onSelectChange}
                  />
                  <CardHolderInfoSection
                    accountInfo={accountInfo}
                    onTextChange={this.onTextChange}
                  />
                  <CardSubmitSection
                    handleDepositSend={this.handleDepositSend}
                  />
                </div>)}

          </div>
        )
    )
  }
}

const mapStateToProps = state => ({
  response: state.deposit.common.response || {},
  settings: state.deposit.data.settings || {},
  accountInfo: state.deposit.data.accountInfo || {},
  firstLoad: state.deposit.data.firstLoad || {},
  loading: state.deposit.data.isLoading,
})

const mapDispatchToProps = {
  doDataRequest: dataRequest,
  doDepositRequest: depositRequest,
  doItemChange: itemChange,
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileWrapper)
