import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class IframeWrapper extends Component {
  static propTypes = {
    htmlCode: PropTypes.string,
  }

  static defaultProps = {
    htmlCode: '',
  }

  constructor(props) {
    super(props)
    this.iframe = React.createRef()
  }

  componentDidMount() {
    this.updateIframe()
  }

  componentDidUpdate() {
    this.updateIframe()
  }

  updateIframe() {
    const { htmlCode } = this.props
    const document = this.iframe.contentDocument
    const myscript = document.createElement('script')
    myscript.innerHTML = 'var list = document.getElementsByTagName("form"); '
      + 'Array.prototype.forEach.call(list, function(item){item.submit()});'
    document.body.innerHTML = htmlCode
    document.head.appendChild(myscript)
  }

  render() {
    return (
      <iframe ref={this.iframe} title='iframe' width='100%' height='400px' frameBorder='0' allowFullScreen />
    )
  }
}

const mapStateToProps = state => ({})
const mapDispatchToProps = (state, ownProps) => ({})
export default connect(mapStateToProps, mapDispatchToProps)(IframeWrapper)
