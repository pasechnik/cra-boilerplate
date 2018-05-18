import React from 'react'
import { Button } from 'reactstrap'
// import PropTypes from 'prop-types'

const Quote = props => (
  <tr>

    <td>{props.SYMBOL}</td>
    <td>
      <Button color='success' size='lg' block>{props.BID}</Button>
    </td>
    <td>
      <Button color='success' size='lg' block>{props.ASK}</Button>
    </td>
    <td className='text-center'>{props.DIRECTION}</td>
  </tr>
)

// Repo.propTypes = {
//   html_url: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
// }

export default Quote
