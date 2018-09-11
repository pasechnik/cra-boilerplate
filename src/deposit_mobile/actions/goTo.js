import { push } from 'react-router-redux'

export const goTo = url => push(url)

export const goToDispatch = url => dispatch => setTimeout(() => dispatch(push(url)), 20)

export default goTo
