import PropTypes from 'prop-types'

export const propsProduct = {
  propTypes: {
    id: PropTypes.string,
    categoryId: PropTypes.string,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired
  }
}

export default propsProduct
