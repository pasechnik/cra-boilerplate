import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'
import { Route, Switch, Link } from 'react-router-dom'
import {
  Container, Row, Col,
  Button,
  Label, Input,
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'
import Block from './components/Block'
import * as Material from 'react-icons/lib/md'
import { itemChange } from './actions/itemChange'
import { obj } from 'the-utils'

import './style.css'
import './style.min.css'


class Upland extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modal: false,
      blockInfo: {
        id: '',
        width: '',
        length: '',
        square: '',
        owner: '',
        owned: '',
        price: '',
        currency: '$',
      },
      ownedList: [],
    }
  }

  toggleModal = blockInfo => {
   this.setState({
     modal: !this.state.modal,
     blockInfo,
   })
 }

 buyBlock = () => {
   const blockId = this.state.blockInfo.id
   let {ownedList} = this.state
   ownedList.indexOf(blockId) != -1 ? ownedList : ownedList.push(blockId)
   this.setState({
     modal: !this.state.modal,
     ownedList
   })
 }
 sellBlock = () => {
   const ownedList = this.state.ownedList.filter(id => id != this.state.blockInfo.id)
   this.setState({
     modal: !this.state.modal,
     ownedList
   })
 }

  render() {
    const blockQuantity = []
    for (let i = 1; i < 101; i++) {
      const block = {
        id: i,
        width: i,
        length: 10,
        square: 100,
        owner: 'undefined',
        owned: false,
        price: 50,
        priceDiff: Math.floor(Math.random() * 40) + 1,
        currency: '$',
        privateKey: Math.floor(Math.random() * 10000000000000000) + 1  ,
      }
      blockQuantity.push(block)
    }
    return (
      <div id='upland'>
        <div className='container-fluid'>
          <Row>
            <Col>
              <h2 className='text-center'>Upland</h2>
            </Col>
          </Row>
          <Row>
            <Col md={{ size: 12 }}>
              <div className='upland-container'>
                { blockQuantity.map(block => (
                  <Block
                    key={block.id}
                    block={block}
                    toggleModal={this.toggleModal}
                    ownedList={this.state.ownedList}
                  />
                ))}
              </div>
            </Col>
          </Row>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className}>
          <ModalHeader toggle={this.toggleModal}>Property Title #{this.state.blockInfo.id}</ModalHeader>
          <ModalBody style={{textAlign: 'center'}}>
            <div>Title number : #{this.state.blockInfo.id}</div>
            <div>Title address : W 21 st 5th Ave</div>
            <div>Flatiron District, New York City, NY 10036</div>
            <div style={{margin: '10px 0'}}><img src={require('./includes/img/titleMap.png')} /></div>
            <Row>
              <Col md={{size: 4}}>
                <Material.MdHome color="blue" /> <span>none</span>
              </Col>
              <Col md={{size: 4}}>
                <Material.MdTexture color="blue" /> <span>{this.state.blockInfo.square}<sup>2</sup></span>
              </Col>
              <Col md={{size: 4}}>
                <Material.MdShowChart color="blue" /> <span>{this.state.blockInfo.priceDiff}%</span>
              </Col>
            </Row>
            <div style={{paddingTop: 15}}><span style={{color: 'blue'}}>{this.state.blockInfo.privateKey}</span> <b>PRIVATE KEY</b></div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.buyBlock}>Buy Title</Button>
            <Button color="secondary" onClick={this.sellBlock}>Sell Title</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Upland)
