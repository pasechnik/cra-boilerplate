import React from 'react'
import PropTypes from 'prop-types'

const CustomIFrame = ({ target }) =>
  target === 'iframe' ? <iframe title="This is a unique deposit iframe title" name="iframe" frameBorder="0" /> : null

CustomIFrame.propTypes = {
  target: PropTypes.string.isRequired,
}

export default CustomIFrame
