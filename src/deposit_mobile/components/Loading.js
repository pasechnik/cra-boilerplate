import React from 'react'

export const Loading = WrappedComponent => props => (
  <div className='loader-wrapper'>
    {WrappedComponent !== null ? <WrappedComponent {...props} /> : null}
    <div id='loader'>
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
)

export default Loading
