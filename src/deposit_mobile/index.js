import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'
import { Route, Switch, Link } from 'react-router-dom'
import { Container, Row, Col, Button, Label, Input } from 'reactstrap'
import SideNav from './components/SideNav'
import ListContainer from './containers/ListContainer'
import AddNewContainer from './containers/AddNewContainer'
import EditContainer from './containers/EditContainer'
import { clearNotification } from './actions/clearNotification'
import './style.css'
import './style.min.css'
import Slider from "react-slick";
import $ from 'jquery';

class Deposit extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modal: false,
    }
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal })
  }
  clearClasses = () => {
    const activeDiv = document.getElementsByClassName('slick-current')
    const slickDivs = Array.from(document.getElementsByClassName('slick-slide'))
    slickDivs.forEach((el, i) => {
      el.classList.remove('nextSlide')
      el.classList.remove('prevSlide')
    })
  }
  addClasses = () => {
    const activeDiv = document.getElementsByClassName('slick-current')
    const slickDivs = Array.from(document.getElementsByClassName('slick-slide'))
    slickDivs.forEach((el, i) => {
      if (el == activeDiv[0]) {
        slickDivs[i - 1].className += ' prevSlide'
        slickDivs[i + 1].className += ' nextSlide'
      }
    })
  }

  onTextChange = (event, name) => {
    console.log(event.target.value, name)
  }
  onSelectChange = (event, name) => {
    console.log(event.target.value, name)
  }

  componentDidMount() {
    this.addClasses()
  }


  render() {
    ReactGA.pageview(window.location.pathname + window.location.search)
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: '20px',
      slidesToShow: 5,
      beforeChange: () => {
        this.clearClasses()
      },
      afterChange: () => {
        this.addClasses()
      }
    }
    let months = []
    let years = []
    let deposits = []
    for (let i = 1; i <= 31; i++){
      months.push(i)
      i < 15 ? years.push(2018 + (i-1)) : null
    }
    for (let i = 1; i <= 36; i++){
      deposits.push(200 + i*50)
    }

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
              <div className="deposit-mobile-wrapper">
                <h4 className="deposit-title">Funds Amount</h4>
                <Slider {...settings} className="deposit-slider">
                  {deposits.map((e,i) => (
                    <div key={i}>
                      <h3>&euro;{e}</h3>
                    </div>
                  ))}
                </Slider>
                <div className="card-info-wrapper">
                  <h4 className="deposit-title">Card information</h4>
                  <ul>
                    <li><img alt="Visa" src={require('./includes/img/Visa_Logo.png')} width="40" /></li>
                    <li><img alt="MasterCard" src={require('./includes/img/MasterCard_logo.png')} width="40" /></li>
                    <li><img alt="Maestro" src={require('./includes/img/logo-maestro.png')} width="40" /></li>
                  </ul>
                </div>
                <div className="card-number-wrapper">
                  <Row>
                    <Col xs={{size: 12}} md={{size: 12}}>
                      <Label for="credit_card_number">Credit Card Number</Label>
                      <Input name="credit_card_number" onChange={(e) => this.onTextChange(e, 'credit_card_number')} maxLength={16} type="number" placeholder="XXXX XXXX XXXX XXXX" />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={{size: 9}}>
                      <Label for="exp_date">Expiration Date</Label>
                      <Row>
                        <Col xs={{size: 5}} className="month_div selectDiv">
                          <Input name="exp_date_month" onChange={(e) => this.onSelectChange(e, 'exp_date_month')} type="select" placeholder="MM" >
                            {months.map((e,i) => (
                              <option key={i}>{e}</option>
                            ))}
                          </Input>
                        </Col>
                        <Col xs={{size: 6}} className="selectDiv">
                          <Input name="exp_date_year" onChange={(e) => this.onSelectChange(e, 'exp_date_year')} type="select" placeholder="YY" >
                            {years.map((e,i) => (
                              <option key={i}>{e}</option>
                            ))}
                          </Input>
                      </Col>
                    </Row>
                    </Col>
                    <Col xs={{size: 3}} style={{paddingLeft: 0}}>
                      <Label for="exp_date_cvv">CVV</Label>
                      <Input name="exp_date_cvv" onChange={(e) => this.onTextChange(e, 'exp_date_cvv')} type="number" maxLength={3} placeholder="XXX" />
                    </Col>
                  </Row>
                </div>
                <div className="card-user-information-wrapper">
                  <h4 className="deposit-title">Card Holder Info</h4>
                  <Row>
                    <Col xs={{size: 12}}>
                      <Input name="full_name" onChange={(e) => this.onTextChange(e, 'full_name')} type="text" placeholder="Full Name" />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={{size: 12}}>
                      <Input name="phone_number" onChange={(e) => this.onTextChange(e, 'phone_number')} type="number" placeholder="Phone Number" />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={{size: 12}}>
                      <Input name="full_address" onChange={(e) => this.onTextChange(e, 'full_address')} type="text" placeholder="Full Address" />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={{size: 12}}>
                      <Button>Confirm Payment</Button>
                    </Col>
                  </Row>
                </div>

              </div>
            </Col>
          </Row>
        </Container>

      </div>
    )
  }
}

Deposit.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
}

const mapStateToProps = state => ({
  data: state.crud.applications.data,
  notifications: state.crud.notifications.messages,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  clearNotification,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Deposit)
