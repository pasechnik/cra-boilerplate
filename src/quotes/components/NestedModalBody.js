import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { receiveTermsStart as fReceiveTermsStart } from '../actions/receiveTerms'


class NestedModalBody extends Component {
  componentDidMount() {
    const { receiveTermsStart } = this.props
    receiveTermsStart()
  }

  render() {
    const { html, loading } = this.props
    if (loading) {
      return (
        <div className='loader'>
          Loading...
        </div>
      )
    }

    return (
      <div dangerouslySetInnerHTML={{ __html: html }} />
    )
  }
}

NestedModalBody.propTypes = {
  html: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  receiveTermsStart: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  html: state.quotes.terms.html,
  loading: state.quotes.terms.isLoading,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  receiveTermsStart: fReceiveTermsStart,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(NestedModalBody)
