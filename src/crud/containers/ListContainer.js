import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { makeDataRequest } from '../actions/makeDataRequest'


class ListContainer extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.makeDataRequest()
  }
  render() {
    console.log(this.props)
    return (
      <div>List Container</div>
    )
  }
}

ListContainer.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
}

const mapStateToProps = state => ({
  data: state.crud.applications.data,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  makeDataRequest,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer)
