import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import socket from '../../socket/socket'
// import { doUserRepos } from '../actions/doUserRepos'

class Indicators extends Component {
  componentDidMount() {
    socket()
  }

  render() {

    return (
      <div>
        <p>Indicators ...</p>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  //   repos: state.home.userRepos.repos,
  //   loading: state.home.userRepos.isLoading,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  //   doUserRepos,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Indicators)
