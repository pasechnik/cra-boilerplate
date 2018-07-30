import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import creditCardType from 'credit-card-type'
import { Modal, ModalBody } from 'reactstrap'
import FundsSection from '../components/FundsSection'
import CardTypeSection from '../components/CardTypeSection'
import CardInfoSection from '../components/CardInfoSection'
import CardHolderInfoSection from '../components/CardHolderInfoSection'
import fItemChange from '../actions/itemChange'
import { makeDataRequest as fMakeDataRequest } from '../actions/makeDataRequest'
import { makeDepositRequest as fMakeDepositRequest } from '../actions/makeDepositRequest'
import { goTo } from '../actions/goTo'

import '../style.css'
import '../style.min.css'

class MobileWrapper extends Component {
  static propTypes = {
    accountInfo: PropTypes.shape({}).isRequired,
    makeDataRequest: PropTypes.func.isRequired,
    itemChange: PropTypes.func.isRequired,
    makeDepositRequest: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      modal: false,
      cardType: '',
      cardNumber: '',
      cvv: '',
      MT4AccountNumber: 0,
      amount: 0,
      // depositAmount: '',
      firstLoad: {
        number: true,
        cvv: true,
        date: true,
      },
    }
  }
  componentDidMount() {
    const { makeDataRequest, goTo } = this.props
    const {MT4AccountNumber, amount} = this.state
    makeDataRequest()

    window.success3DSecureCallback = () => {
      if ( window.mz_cashier_3d_sec_frame !== undefined) {
        window.mz_cashier_3d_sec_frame.close()
      }
      goTo('/success')
    }
    window.fail3DSecureCallback = () => {
      if ( window.mz_cashier_3d_sec_frame !== undefined) {
        window.mz_cashier_3d_sec_frame.close()
      }
      goTo('/error')
    }
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

  onSelectChange = (event, name) => {
    const {firstLoad} = this.state
    const { itemChange, accountInfo } = this.props
    // console.log(event.target.value, name)
    itemChange({
      ...accountInfo,
      [name]: event.target.value,
    })
    this.setState({firstLoad: {...firstLoad, date: false}})
  }

  onDepositChange = (slideNumber) => {
    const { itemChange, accountInfo } = this.props
    const amount = 250 + (parseInt(slideNumber, 10) * 50)
    // this.setState({ depositAmount: amount })
    itemChange({
      ...accountInfo,
      amount,
    })
  }

  validateCardNumber = (number, name) => {
    const { itemChange, accountInfo } = this.props
    const { firstLoad } = this.state
    const cardType = (creditCardType(number)[0] !== undefined && number.length !== 0)
      ? creditCardType(number)[0].niceType
      : ''
    this.setState({
      cardType,
      firstLoad: {
        ...firstLoad,
        number: false,
      },
      cardNumber: number.slice(0, 16)
    })
    const newAccountInfo = number.length < 17
      ? {
        ...accountInfo,
        [name]: number,
      }
      : {
        ...accountInfo,
        [name]: number.slice(0, 16),
      }
    itemChange(newAccountInfo)
  }

  toggle = () => {
    const { modal } = this.state
    this.setState({ modal: !modal })
  }

  _validateFields = () => {
    const { cardNumber, cvv } = this.state

    if (cardNumber.length === 16 && cvv.length === 3) {
      return true
    }
    return false
  }

  validateDate = () => {
    const month = this.props.accountInfo.exp_date_month
    const year = this.props.accountInfo.exp_date_year
    const thisDate = new Date()
    const cardDate = new Date(year, month - 1)

    return thisDate < cardDate ? true : false
  }

  handleDepositSend = () => {
    const { makeDepositRequest, accountInfo } = this.props
    this.setState({
      firstLoad: {
        cardNumber: false,
        cvv: false,
      }
    })
    if (this._validateFields() && this.validateDate()){
      makeDepositRequest(accountInfo)
    }
  }

  openWindowWithPost(url, data) {
    const form = document.createElement('form')
    const windowoption = 'resizable=yes,height=600,width=800,location=0,menubar=0,scrollbars=1'
    form.target = 'mz_cashier_3d_sec_frame'
    form.method = 'POST'
    form.action = url
    form.style.display = 'none'

    Object.keys(data).map(function (key) {
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = key
      input.value = data[key]
      form.appendChild(input)
    })

    document.body.appendChild(form)

    window.mz_cashier_3d_sec_frame = window.open(url, 'mz_cashier_3d_sec_frame', windowoption)
    form.submit()
  }

  componentWillReceiveProps(nextProps) {
    const { status, the3d_url, the3d_params } = nextProps.d3_data
    if (status === 'Pending') {
      this.openWindowWithPost(the3d_url, the3d_params)
    }
  }

  render() {
    const { accountInfo, settings:{max_d, currency} } = this.props
    const {
      firstLoad, cardType, cardNumber, cvv,
    } = this.state

    return (
      this.props.loading ?
      <div className="loader-wrapper"><div id="loader"><div></div><div></div><div></div><div></div></div></div> :
      <div id='deposit_mobile'>
        <div className='deposit-mobile-wrapper'>
          <FundsSection
            onDepositChange={this.onDepositChange}
            maxDeposit={max_d}
            currency={currency}
          />
          <CardTypeSection cardType={cardType} />
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
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  settings: state.deposit.data ? state.deposit.data.settings : {},
  accountInfo: state.deposit.data ? state.deposit.data.accountInfo : {},
  d3_data: state.deposit.makeDeposit ? state.deposit.makeDeposit.d3_data : {},
  loading: state.deposit.data.isLoading,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  makeDataRequest: fMakeDataRequest,
  makeDepositRequest: fMakeDepositRequest,
  itemChange: fItemChange,
  goTo,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MobileWrapper)
