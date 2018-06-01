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
    const pattern = /^[0-9]{4}$/g
    const res = num.search(pattern)
    if (res === -1) {
      this.setState({ invalid: true })
    } else {
      this.setState({ invalid: false })
      this.props.goTo('/quotes/')
    }
    return false
  }


  render() {
    return (
      <div>
        <div className='d-flex justify-content-between'>
          <Link
            to='/quotes/phone-verification/'
            href='/quotes/phone-verification/'
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
            <h5 className='quote_code-h4'>Please Enter here Code you received:</h5>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Input
                  className='text-center mt-3 py-2'
                  type='password'
                  name='code'
                  placeholder='1111'
                  value={this.state.value}
                  onChange={this.handleChange}
                  invalid={this.state.invalid}
                />
                <FormFeedback>Enter valid code</FormFeedback>
              </FormGroup>
              <Button
                className='confirm-btn btn-lg btn-block mt-4'
              >
                Continue Trading
              </Button>
            </Form>
            <Button
              className='resend-btn btn-lg btn-block my-4'
            >
              Resend
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}

PhoneVerification.propTypes = {
  goTo: PropTypes.func.isRequired,
}

// const mapStateToProps = state => ({
// url: state.quotes.location.url,
// })

const mapDispatchToProps = dispatch => bindActionCreators({
  goTo,
}, dispatch)

export default connect(null, mapDispatchToProps)(HocModal(PhoneVerification))
