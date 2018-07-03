import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'
import { Route, Switch, Link } from 'react-router-dom'
import { Container, Row, Col, Button, Label, Input } from 'reactstrap'
import FundsSection from './components/FundsSection'
import CardTypeSection from './components/CardTypeSection'
import CardInfoSection from './components/CardInfoSection'
import CardHolderInfoSection from './components/CardHolderInfoSection'
import creditCardType from 'credit-card-type'
import { makeDataRequest } from './actions/makeDataRequest'
import { itemChange } from './actions/itemChange'

import './style.css'
import './style.min.css'


class Deposit extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modal: false,
      cardType: '',
      cardNumber: '',
      cvv: '',
      depositAmount: '',
      firstLoad: {
        number: true,
        cvv: true,
      },
    }
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal })
  }

  onTextChange = (event, name) => {
    if (name === 'credit_card_number') {
      this.validateCardNumber(event.target.value, name)
    } else if (name === 'exp_date_cvv') {
      if (event.target.value < 4) {
        this.props.itemChange({ ...this.props.accountInfo, [name]: event.target.value })
        this.setState({ firstLoad: { ...this.state.firstLoad, cvv: false } })
      } else {
        this.props.itemChange({ ...this.props.accountInfo, [name]: event.target.value.slice(0, 3) })
        this.setState({ firstLoad: { ...this.state.firstLoad, cvv: false } })
      }
    } else {
      this.props.itemChange({ ...this.props.accountInfo, [name]: event.target.value })
    }
  }

  onSelectChange = (event, name) => {
    console.log(event.target.value, name)
  }

  validateCardNumber = (number, name) => {
    const cardType = (creditCardType(number)[0] !== undefined && number.length !== 0) ? creditCardType(number)[0].niceType : ''
    this.setState({ cardType, firstLoad: { ...this.state.firstLoad, number: false } })
    const accountInfo = number.length < 17 ? { ...this.props.accountInfo, [name]: number } : { ...this.props.accountInfo, [name]: number.slice(0, 16) }
    this.props.itemChange(accountInfo)
  }

  onDepositChange = (slideNumber) => {
    const amount = 200 + ++slideNumber * 50
    this.setState({ depositAmount: amount })
  }

  componentDidMount() {
    this.props.makeDataRequest()
  }

  render() {
    ReactGA.pageview(window.location.pathname + window.location.search)
    return (
      <div id='deposit_mobile'>
        <Container>
          <Row>
            <Col>
              <h2 className='text-center'>Mobile Deposit</h2>
            </Col>
          </Row>
          <Row>
            <Col xs={{ size: 12, offset: 0 }} md={{ size: 4, offset: 4 }}>
              <div className='deposit-mobile-wrapper'>
                <FundsSection onDepositChange={this.onDepositChange} />
                <CardTypeSection cardType={this.state.cardType} />
                <CardInfoSection
                  cardNumber={this.state.cardNumber}
                  cvv={this.state.cvv}
                  onTextChange={this.onTextChange}
                  onSelectChange={this.onSelectChange}
                  firstLoad={this.state.firstLoad}
                  accountInfo={this.props.accountInfo}
                />
                <CardHolderInfoSection accountInfo={this.props.accountInfo} onTextChange={this.onTextChange} />
              </div>
            </Col>
          </Row>
        </Container>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  settings: state.deposit.data.settings,
  accountInfo: state.deposit.data.accountInfo,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  makeDataRequest,
  itemChange,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Deposit)
