import React, { Component } from 'react'
import { obj } from '../../../utils/object'

class Form extends Component {
  static openNewWindow(name, opt) {
    const options = opt || 'resizable=yes,height=600,width=980,location=0,menubar=0,scrollbars=1,top=150,left=260'
    if (window[name]) {
      window[name].close()
      delete window[name]
    }
    window[name] = window.open('', name, options)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { response } = nextProps
    if (response.status !== prevState.response.status) {
      return {
        response,
        generateForm: response.status === 'Pending',
      }
    }
    return null
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      response: {},
      generateForm: false,
    }
  }

  componentDidMount() {
    const { generateForm } = this.state

    if (generateForm) {
      this.submitForm()
        .then(form => form.submit())
        .catch(error => console.log(error))
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { response } = nextProps
    if (response.status !== nextState.response.status) {
      return {
        response,
        generateForm: response.status === 'Pending',
      }
    }
    return false
  }

  submitForm = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const form = document.querySelector('form[name="depositForm"]')
        form ? resolve(form) : reject(new Error("Can't detect the Deposit form"))
      }, 1000)
    })

  typeOfWhatever = v => {
    if (v === null) return 'null'
    if (v !== Object(v)) return typeof v
    return {}.toString
      .call(v)
      .slice(8, -1)
      .toLowerCase()
  }

  generateForm = res => {
    const { target, form, params } = res
    const typeOfForm = this.typeOfWhatever(form)
    const typeOfParams = this.typeOfWhatever(params)
    if (target === 'popup') Form.openNewWindow('popup')
    switch (typeOfForm) {
      case 'string':
        return this.parseFormFromString(res)
      default:
        switch (typeOfParams) {
          case 'object':
            return this.parseFormFromParams(res)
          case 'string':
          default:
            return this.parseFormFromURL(res)
        }
    }
  }

  parseFormFromURL = res => {
    const { url, target } = res
    if (!url) {
      this.resetState()
      return this.showMessage('Failed', 'System response with no form, url, and params ')
    }
    const [newURL, paramsStr] = url.split('?')
    const method = 'GET'
    // Convert url params to a obj
    const params = paramsStr ? obj.urlToObj(paramsStr) : {}
    const inputs = Object.keys(params).map(key => <input type="hidden" key={key} name={key} value={params[key]} />)
    return (
      <form action={newURL} target={target} method={method} name="depositForm">
        {inputs}
      </form>
    )
  }

  parseFormFromString = res => {
    const { target, form } = res
    const newString =
      form.indexOf('target') > 0
        ? form.replace('target=', `name="depositForm" target="${target}" data-old-target=`)
        : form.replace('<form', `<form ref="form" name="depositForm" target="${target}"`)
    return <div dangerouslySetInnerHTML={{ __html: newString }} />
  }

  parseFormFromParams = res => {
    const { url, params, target } = res
    const method = params.sendMethod || 'POST'
    const inputs = Object.keys(params).map(key => <input type="hidden" key={key} name={key} value={params[key]} />)
    return (
      <form action={url} target={target} method={method} name="depositForm">
        {inputs}
      </form>
    )
  }

  render() {
    const { response, generateForm } = this.state
    return generateForm ? this.generateForm(response) : <div />
  }
}

export default Form
