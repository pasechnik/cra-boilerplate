import React, { Component } from 'react'
import PropTypes from 'prop-types'


class ListContainer extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.fetch()
  }
  render() {
    console.log(this.props)
    return (
      <div>List Container</div>
    )
  }
}

export default ListContainer
