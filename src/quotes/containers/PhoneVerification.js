import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Row, Col, Button, Form, FormGroup, Input, FormFeedback } from 'reactstrap'
import { Link } from 'react-router-dom'
import { goTo } from '../../common/actions/goTo'
import HocModal from '../HOC/HocModal'


class PhoneVerification extends Component {
  constructor(props) {
    super(props)

    this.state = {
      invalid: false,
      value: '',
    }
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const num = this.state.value.trim()
    const pattern = /^\+?\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{5})$/g
    const res = num.search(pattern)
    if (res === -1) {
      this.setState({ invalid: true })
    } else {
      this.setState({ invalid: false })
      console.log(this.state.value)
      this.props.goTo('/quotes/code-verification')
    }
    return false
  }


  render() {
    return (
      <div>
        <div className='d-flex justify-content-between'>
          <Link
            to={`/quotes/list/${this.props.url}`}
            href={`/quotes/list/${this.props.url}`}
            className='quote_back-btn'
          >
            <i className='fa fa-chevron-left' />
          </Link>
          <h3 className='font-weight-bold text-center mb-3'>Verify your Phone</h3>
          <Link
            to='/quotes'
            href='/quotes'
            className='quote_close-btn'
          >
            <i className='fa fa-times' />
          </Link>
        </div >
        <p className='px-4'>And we let you know when your Asset reached profile / lost boundaries</p>
        <hr />
        <Row>
          <Col md={{ size: 6, offset: 3 }} xs={{ size: 10, offset: 1 }}>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Input
                  className='text-center mt-3 py-2'
                  type='tel'
                  name='phone'
                  placeholder='+97252586548'
                  value={this.state.value}
                  onChange={this.handleChange}
                  invalid={this.state.invalid}
                />
                <FormFeedback>Enter valid phone number</FormFeedback>
              </FormGroup>
              <Button
                className='confirm-btn btn-lg btn-block'
              >
                Send Verification Code
              </Button>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col sm={{ size: 6, offset: 3 }} xs={{ size: 10, offset: 1 }}>
            <p
              className='text-center verify-phone_text my-3'
            >
              Clicking on the button above will send SMS with Verification Code
            </p>
          </Col>
        </Row>
      </div>
    )
  }
}

PhoneVerification.propTypes = {
  goTo: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  url: state.quotes.location.url,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  goTo,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(HocModal(PhoneVerification))
