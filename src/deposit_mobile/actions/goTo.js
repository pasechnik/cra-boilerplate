import { push } from 'react-router-redux'

export const goTo = url => dispatch => Promise.resolve().then(() => setTimeout(() => {
  dispatch(push(url))
}, 20))

export default goTo
