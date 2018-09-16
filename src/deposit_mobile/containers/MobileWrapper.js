import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import creditCardType from 'credit-card-type'
import { Modal, ModalBody } from 'reactstrap'
import FundsSection from '../components/FundsSection'
// import CardTypeSection from '../components/CardTypeSection'
import CardInfoSection from '../components/CardInfoSection'
import CardHolderInfoSection from '../components/CardHolderInfoSection'
import IframeWrapper from '../components/IframeWrapper'
import fItemChange from '../actions/itemChange'
import { makeDataRequest as fMakeDataRequest } from '../actions/makeDataRequest'
import { makeDepositRequest as fMakeDepositRequest } from '../actions/makeDepositRequest'
import { goToDispatch as fGoTo } from '../actions/goTo'

import config from '../config'

import '../style.css'

class MobileWrapper extends Component {
  static propTypes = {
    accountInfo: PropTypes.shape({}).isRequired,
    makeDataRequest: PropTypes.func.isRequired,
    itemChange: PropTypes.func.isRequired,
    makeDepositRequest: PropTypes.func.isRequired,
    goTo: PropTypes.func.isRequired,
  }

  state = {
    modal: false,
    form: '',
    cardType: '',
    cardNumber: '',
    cvv: '',
    firstLoad: {
      number: true,
      cvv: true,
      date: true,
    },
  }

  componentDidMount() {
    const {
      makeDataRequest,
      goTo,
    } = this.props

    setTimeout(() => makeDataRequest(), 0)
    // makeDataRequest()

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
      status, the3d_url, the3d_params, success, the3d_form, target,
    } = nextProps.d3_data
    if (success === true && status === 'Pending') {
      if ((target === 'iframe' || target === 'popup') && the3d_url !== '') {
        this.openWindowWithPost(the3d_url, the3d_params)
      } else if (target === 'iframe' && the3d_form !== '') {
        this.setState({
          form: the3d_form,
          modal: true,
        })
      }
    } else if (success === false) {
      setTimeout(() => goTo('/error'), 50)
    }
  }

  onSelectChange = (event, name) => {
    const { firstLoad } = this.state
    const { itemChange, accountInfo } = this.props
    itemChange({
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
    const { itemChange, accountInfo } = this.props
    const { firstLoad } = this.state

    if (name === 'credit_card_number') {
      this.validateCardNumber(event.target.value, name)
    } else if (name === 'exp_date_cvv') {
      if (event.target.value < 4) {
        itemChange({
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
        itemChange({
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
      itemChange({
        ...accountInfo,
        [name]: event.target.value,
      })
    }
  }

  onDepositChange = (slideNumber) => {
    const { itemChange, accountInfo } = this.props
    const amount = 200 + (parseInt(slideNumber, 10) * 50)
    itemChange({
      ...accountInfo,
      amount,
    })
  }

  validateCardNumber = (number, name) => {
    const { itemChange, accountInfo } = this.props
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
    itemChange(newAccountInfo)
  }

  toggle = () => {
    const { modal } = this.state
    this.setState({ modal: !modal })
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
    const { makeDepositRequest, accountInfo } = this.props
    this.setState({
      firstLoad: {
        cardNumber: false,
        cvv: false,
      },
    })
    if (this.validateFields() && this.validateDate()) {
      makeDepositRequest(accountInfo)
    }
  }

  openWindowWithPost = (url, data) => {
    const form = document.createElement('form')
    const windowoption = 'resizable=yes,height=600,width=800,location=0,menubar=0,scrollbars=1'
    form.target = 'mz_cashier_3d_sec_frame'
    form.method = url.indexOf('?') === -1 ? 'POST' : 'GET'
    form.action = url
    form.style.display = 'none'

    Object.keys(data)
      .map((key) => {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = key
        input.value = data[key]
        form.appendChild(input)
        return true
      })

    document.body.appendChild(form)

    window.mz_cashier_3d_sec_frame = window.open(url, 'mz_cashier_3d_sec_frame', windowoption)
    form.submit()
  }

  render() {
    const {
      accountInfo,
      settings: { max_d, currency },
      loading,
    } = this.props
    const {
      firstLoad,
      cardNumber,
      cvv,
      form,
      modal,
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
                handleDepositSend={this.handleDepositSend}
                accountInfo={accountInfo}
                onTextChange={this.onTextChange}
              />
            </div>
            {/* className={className} */}
            <Modal isOpen={modal} toggle={this.toggle}>
              <ModalBody>
                <IframeWrapper htmlCode={form} />
              </ModalBody>
            </Modal>
          </div>
        )
    )
  }
}

const mapStateToProps = state => ({
  settings: state.deposit.data.settings || {},
  accountInfo: state.deposit.data.accountInfo || {},
  d3_data: state.deposit.makeDeposit.d3_data || {},
  loading: state.deposit.data.isLoading,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  makeDataRequest: fMakeDataRequest,
  makeDepositRequest: fMakeDepositRequest,
  itemChange: fItemChange,
  goTo: fGoTo,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MobileWrapper)
