import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import creditCardType from 'credit-card-type'
// import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import FundsSection from '../components/FundsSection'
import CardTypeSection from '../components/CardTypeSection'
import CardInfoSection from '../components/CardInfoSection'
import CardHolderInfoSection from '../components/CardHolderInfoSection'
import fItemChange from '../actions/itemChange'
import { makeDataRequest as fMakeDataRequest } from '../actions/makeDataRequest'
import { makeDepositRequest as fMakeDepositRequest } from '../actions/makeDepositRequest'
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
      // depositAmount: '',
      firstLoad: {
        number: true,
        cvv: true,
      },
    }
  }
  componentDidMount() {
    const { makeDataRequest } = this.props
    makeDataRequest()
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
    const { itemChange, accountInfo } = this.props
    // console.log(event.target.value, name)
    itemChange({
      ...accountInfo,
      [name]: event.target.value,
    })
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

  handleDepositSend = () => {
    const { makeDepositRequest, accountInfo } = this.props
    this.setState({
      firstLoad: {
        cardNumber: false,
        cvv: false,
      }
    })
    this._validateFields() ? makeDepositRequest(accountInfo) : null
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
      </div>
    )
  }
}

const mapStateToProps = state => ({
  settings: state.deposit.data ? state.deposit.data.settings : {},
  accountInfo: state.deposit.data ? state.deposit.data.accountInfo : {},
  loading: state.deposit.data.isLoading,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  makeDataRequest: fMakeDataRequest,
  makeDepositRequest: fMakeDepositRequest,
  itemChange: fItemChange,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MobileWrapper)
