import React from 'react'

const Pixels = (props) => {
  if (props.pixels && props.pixels.length > 0) {
    return props.pixels.map((i, index) => (i
      && <div className='pixels-fire' dangerouslySetInnerHTML={{ __html: i }} key={index} />))
  }
  return <div />
}
export default Pixels
