import PropTypes from 'prop-types'

export const category = {
  propTypes: {
    id: PropTypes.string,
    categoryId: PropTypes.string,
    name: PropTypes.string.isRequired,
    description: PropTypes.string
  }
}

export default category
