import PropTypes from 'prop-types'

export const product = {
  propTypes: {
    id: PropTypes.string,
    categoryId: PropTypes.string,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired
  }
}

export default product
