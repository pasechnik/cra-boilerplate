import React from 'react'
import PropTypes from 'prop-types'

const Block = ({ block, block: { id, owner, price, width, currency, square }, ownedList, toggleModal }) => {
  const ownedBlock = ownedList.indexOf(id) !== -1
  return (
    <div className={`w-${width} block-item-wrapper`}>
      <div
        aria-hidden
        onClick={() => toggleModal(block)}
        style={{ height: 'auto' }}
        className={` block-item ${ownedBlock ? 'owned-block' : ''}`}
      >
        <span>
          <b>Owner</b>: {owner}
        </span>
        <span>
          <b>Price</b>: {currency} {price}
        </span>
        <span>
          <b>S</b>: {square}
          <sup>2</sup>
        </span>
      </div>
    </div>
  )
}

Block.propTypes = {
  block: PropTypes.shape({
    id: PropTypes.number.isRequired,
    owned: PropTypes.bool.isRequired,
    owner: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    square: PropTypes.number.isRequired,
  }).isRequired,
  toggleModal: PropTypes.func.isRequired,
  ownedList: PropTypes.arrayOf(PropTypes.number).isRequired,
}

export default Block
