import React from 'react'

const CustomIframe = (props) => ( props.target === 'iframe' ? <iframe name='iframe' frameBorder='0' /> : <div />)

export default CustomIframe
