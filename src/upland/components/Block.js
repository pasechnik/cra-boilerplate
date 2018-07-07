import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { obj } from 'the-utils'

class Block extends Component {
  constructor(props){
    super(props)

    this.state = {
      owned: this.props.block.owned,
    }
  }
  handleOwn = () => {
    this.setState({owned: !this.state.owned})
  }

  render() {
    return (
      <div onClick={this.handleOwn} className={'block-item ' + (this.state.owned ? 'owned-block' : '')}>
        <span><b>Owner</b>: {this.props.block.owner}</span>
        <span><b>S</b>: {this.props.block.square}<sup>2</sup></span>
      </div>
    )
  }
}

export default Block
