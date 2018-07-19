import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import creditCardType from 'credit-card-type'
// import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import MobileWrapper from './containers/MobileWrapper'
import SuccessDeposit from './containers/SuccessDeposit'
import fItemChange from './actions/itemChange'
import { makeDataRequest as fMakeDataRequest } from './actions/makeDataRequest'
import { makeDepositRequest as fMakeDepositRequest } from './actions/makeDepositRequest'
import './style.css'
import './style.min.css'

class Deposit extends Component {
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
        })
      } else {
        itemChange({
          accountInfo,
          [name]: event.target.value.slice(0, 3),
        })
        this.setState({
          firstLoad: {
            ...firstLoad,
            cvv: false,
          },
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
    const amount = 200 + (parseInt(slideNumber, 10) * 50)
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

  handleDepositSend = () => {
    const { makeDepositRequest, accountInfo } = this.props
    makeDepositRequest(accountInfo)
  }

  render() {
    const { accountInfo, match: { path } } = this.props
    const {
      firstLoad, cardType, cardNumber, cvv,
    } = this.state

    const MobileWrapperWithProps = () => {
      return (
        <MobileWrapper
          onDepositChange={this.onDepositChange}
          cardType={cardType}
          cvv={cvv}
          onTextChange={this.onTextChange}
          onSelectChange={this.onSelectChange}
          firstLoad={firstLoad}
          accountInfo={accountInfo}
          handleDepositSend={this.handleDepositSend}
          accountInfo={accountInfo}
          onTextChange={this.onTextChange}
        />
      )
    }
    const SuccessDepositWithProps = () => {
      return (
        <SuccessDeposit
          currency={accountInfo.currency}
          amount={accountInfo.amount}
        />
      )
    }
    return (
      <div id='deposit_mobile'>

        <Switch>
          <Route path={`${path}`} component={MobileWrapperWithProps} />
          <Route path={`${path}/success`} component={SuccessDepositWithProps} />
      {/* <Route path={`${path}/edit/:id`} component={EditContainer} /> */}
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  settings: state.deposit.data ? state.deposit.data.settings : {},
  accountInfo: state.deposit.data ? state.deposit.data.accountInfo : {},
})

const mapDispatchToProps = dispatch => bindActionCreators({
  makeDataRequest: fMakeDataRequest,
  makeDepositRequest: fMakeDepositRequest,
  itemChange: fItemChange,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Deposit)
