import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { obj } from 'the-utils'

class Block extends Component {
  constructor(props) {
    super(props)

    this.state = {
      owned: this.props.block.owned,
    }
  }

  render() {
    const {id, owned, owner, price, width, currency, square} = this.props.block
    const ownedBlock = this.props.ownedList.indexOf(id) != -1
    return (
      <div className={`w-${width} block-item-wrapper`}>
        <div
          onClick={() => this.props.toggleModal(this.props.block)}
          style={{ height: 'auto' }}
          className={` block-item ${ownedBlock ? 'owned-block' : ''}`}
        >
          <span><b>Owner</b>: {owner}</span>
          <span><b>Price</b>: {currency}{price}</span>
          <span><b>S</b>: {square}<sup>2</sup></span>
        </div>

      </div>
    )
  }
}

export default Block
