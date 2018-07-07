import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'
import { Route, Switch, Link } from 'react-router-dom'
import { Container, Row, Col, Button, Label, Input } from 'reactstrap'
import Block from './components/Block'
import { itemChange } from './actions/itemChange'
import { obj } from 'the-utils'

import './style.css'
import './style.min.css'


class Upland extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    let blockQuantity = []
    for (let i = 1; i < 101; i++){
      const block = {
        id: i,
        width: 10,
        length: 10,
        square: 100,
        owner: 'undefined',
        owned: false,
      }
      blockQuantity.push(block)
    }
    console.log(blockQuantity)
    return (
      <div id='upland'>
        <div className="container-fluid">
          <Row>
            <Col>
              <h2 className='text-center'>Upland</h2>
            </Col>
          </Row>
          <Row>
            <Col md={{ size: 12 }}>
              <div className='upland-container'>
                { blockQuantity.map((block) => (
                  <Block key={block.id} block={block}/>
                ))}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Upland)
