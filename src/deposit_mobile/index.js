import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'
import creditCardType from 'credit-card-type'
import { Container, Row, Col } from 'reactstrap'
import FundsSection from './components/FundsSection'
import CardTypeSection from './components/CardTypeSection'
import CardInfoSection from './components/CardInfoSection'
import CardHolderInfoSection from './components/CardHolderInfoSection'
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
    const { accountInfo } = this.props
    const {
      firstLoad, cardType, cardNumber, cvv,
    } = this.state
    ReactGA.pageview(window.location.pathname + window.location.search)
    return (
      <div id='deposit_mobile'>
        <Container>
          <Row>
            <Col>
              <h2 className='text-center'>
                Mobile Deposit
              </h2>
            </Col>
          </Row>
          <Row>
            <Col
              xs={{
                size: 12,
                offset: 0,
              }}
              md={{
                size: 4,
                offset: 4,
              }}
            >
              <div className='deposit-mobile-wrapper'>
                <FundsSection onDepositChange={this.onDepositChange} />
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
            </Col>
          </Row>
        </Container>

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