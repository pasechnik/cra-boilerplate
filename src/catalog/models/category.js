import PropTypes from 'prop-types'

export const emptyCategory = {
  id: null,
  categoryId: null,
  name: '',
  description: ''
}

export const propsCategory = {
  propTypes: {
    id: PropTypes.string,
    categoryId: PropTypes.string,
    name: PropTypes.string.isRequired,
    description: PropTypes.string
  }
}
