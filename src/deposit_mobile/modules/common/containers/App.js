import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Col, Nav, NavItem, Row, Tab } from 'react-bootstrap'

import 'styles/tabs.scss'

import Amount from '../../amount/containers'

import Account from '../../account/containers'

import DepositModal from '../../modal/containers'

import BlinkingDots from '../components/BlinkingDots'

import Submit from '../../submit/containers'

import Ewallet from '../../ewallet/containers'

import CreditCard from '../../creditcard/containers'

import fetchSettings from '../actions/fetch'
import setMethod from '../actions/setMethod'
import fetchCountries from '../actions/fetchCountries'

import setAmountConfig from '../../amount/actions/setAmountConfig'
import setAccount from '../../account/actions/setAccount'
import setAPMs from '../../ewallet/actions/setAPMs'

class App extends Component {
  componentDidMount() {
    this.props.fetchSettings().then(res => {
      this.props.setAmountConfig(res.payload)
      this.props.setAccount({ ...res.payload.accountInfo, Country: res.payload.country_by_ip })
      this.props.setAPMs(res.payload.apm)
    })
    this.props.fetchCountries()
  }

  _tabChange = method => {
    this.props.setMethod(method)
  }

  render() {
    return (
      <div className="container">
        <Tab.Container defaultActiveKey="creditCard" onSelect={this._tabChange} id="custom">
          <Row className="clearfix">
            <Col md={2} sm={12} id="left-tabs-deposit">
              <Row>
                <Nav bsStyle="pills" className="deposit-tabs" stacked>
                  <NavItem className="creditCard" eventKey="creditCard" key="creditCard">
                    <div className={this.props.fetching ? 'Loading' : 'Loading hide'}>
                      <BlinkingDots dots text="" active={this.props.fetching} />
                    </div>
                    <span className="icon-tab" />
                    <span className="tab-title-deposit">{this.props.lang.mz_cashier_cc_deposit_form}</span>
                  </NavItem>
                  {this.props.eWallet.length > 0 && (
                    <NavItem className="apm_tab" eventKey="eWallet" key="eWallet">
                      <span className="icon-tab" />
                      <span className="tab-title-deposit">{this.props.lang.mz_cashier_apm_tab_title}</span>
                    </NavItem>
                  )}

                  {/* <NavItem className='bitcoin_tab' eventKey='Bitcoin' key='Bitcoin'> */}
                  {/* <span className='icon-tab' /> */}
                  {/* <span className='tab-title-deposit'>{this.props.lang.mz_cashier_bitcoin_tab_title}</span> */}
                  {/* </NavItem> */}
                </Nav>
              </Row>
            </Col>
            <Col md={10} sm={12} className="tabs-wrapper">
              <div className={this.props.fetching ? 'Loading' : 'Loading hide'}>
                <BlinkingDots dots text="" active={this.props.fetching} />
              </div>
              <Tab.Content animation>
                <Amount />
                <Tab.Pane eventKey="creditCard">
                  <CreditCard />
                  <Account />
                </Tab.Pane>
                {this.props.eWallet.length > 0 && (
                  <Tab.Pane eventKey="eWallet">
                    <Ewallet />
                  </Tab.Pane>
                )}
                {/* <Tab.Pane eventKey='Bitcoin'> */}
                {/* <Bitcoin /> */}
                {/* </Tab.Pane> */}
                <Submit buttonText={this.props.lang.mz_cashier_submit} />
                <DepositModal />
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  fetching: state.common.fetching,
  method: state.common.method,
  lang: state.common.lang,
  eWallet: state.eWallet.apm,
})

const mapDispatchToProps = {
  fetchSettings,
  fetchCountries,
  setAPMs,
  setMethod,
  setAccount,
  setAmountConfig,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
