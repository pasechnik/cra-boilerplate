import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Route, Switch } from 'react-router-dom'

class Deposit extends Component {

  render() {
    return this.props.children
  }
}

export default Deposit
