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
    const block = this.props.block
    return (
      <div className={`w-${block.width} block-item-wrapper`}>
        <div
          onClick={this.handleOwn}
          style={{height: 'auto'}}
          className={' block-item ' + (this.state.owned ? 'owned-block' : '')}
        >
          <span><b>Owner</b>: {block.owner}</span>
          <span><b>Price</b>: {block.currency}{block.price}</span>
          <span><b>S</b>: {block.square}<sup>2</sup></span>
        </div>
      </div>
    )
  }
}

export default Block
