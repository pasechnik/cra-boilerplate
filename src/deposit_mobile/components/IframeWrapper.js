import React, { Component } from 'react'
import { connect } from 'react-redux'

class IframeWrapper extends Component {
  componentDidMount() {
    this._updateIframe()
  }

  componentDidUpdate() {
    this._updateIframe()
  }

  _updateIframe() {
    const { iframe } = this.refs
    const document = iframe.contentDocument
    const myscript = document.createElement('script')
    myscript.innerHTML = 'var list = document.getElementsByTagName("form"); Array.prototype.forEach.call(list, function(item){item.submit()});'
    document.body.innerHTML = this.props.htmlCode
    document.head.appendChild(myscript)
  }

  render() {
    return (
      <iframe ref='iframe' title='iframe' width='100%' height='400px' frameBorder='0' allowFullScreen />
    )
  }
}

const mapStateToProps = state => ({})
const mapDispatchToProps = (state, ownProps) => ({})
export default connect(mapStateToProps, mapDispatchToProps)(IframeWrapper)
