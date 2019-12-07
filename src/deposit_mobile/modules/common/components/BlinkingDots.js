import React from 'react'

const BlinkingDots = props => {
  const dots = props.dots ? (
    <span>
      <span className="loader__dot">.</span>
      <span className="loader__dot">.</span>
      <span className="loader__dot">.</span>
    </span>
  ) : (
    ''
  )
  if (props.active) {
    return (
      <div className="processing-window">
        {props.text}
        {dots}
      </div>
    )
  }
  return <span />
}

export default BlinkingDots
