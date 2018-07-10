import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import {
  Row, Col,
  Button,
  Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap'
import * as Material from 'react-icons/lib/md'
import Block from './components/Block'
import TitleMap from './includes/img/titleMap.png'
// import { itemChange } from './actions/itemChange'


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

  toggleModal = (blockInfo) => {
    this.setState({
      modal: !this.state.modal,
      blockInfo,
    })
  }

 buyBlock = () => {
   const blockId = this.state.blockInfo.id
   const { ownedList } = this.state
   ownedList.indexOf(blockId) !== -1 ? ownedList : ownedList.push(blockId)
   this.setState({
     modal: !this.state.modal,
     ownedList,
   })
 }
 sellBlock = () => {
   const ownedList = this.state.ownedList.filter(id => id !== this.state.blockInfo.id)
   this.setState({
     modal: !this.state.modal,
     ownedList,
   })
 }

 render() {
   const blockQuantity = []
   for (let i = 1; i < 101; i += 1) {
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
       privateKey: Math.floor(Math.random() * 10000000000000000) + 1,
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
       <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
         <ModalHeader toggle={this.toggleModal}>Property Title #{this.state.blockInfo.id}</ModalHeader>
         <ModalBody style={{ textAlign: 'center' }}>
           <div>Title number : #{this.state.blockInfo.id}</div>
           <div>Title address : W 21 st 5th Ave</div>
           <div>Flatiron District, New York City, NY 10036</div>
           <div style={{ margin: '10px 0' }}><img src={TitleMap} alt='' /></div>
           <Row>
             <Col md={{ size: 4 }}>
               <Material.MdHome color='blue' /> <span>none</span>
             </Col>
             <Col md={{ size: 4 }}>
               <Material.MdTexture color='blue' /> <span>{this.state.blockInfo.square}<sup>2</sup></span>
             </Col>
             <Col md={{ size: 4 }}>
               <Material.MdShowChart color='blue' /> <span>{this.state.blockInfo.priceDiff}%</span>
             </Col>
           </Row>
           <div style={{ paddingTop: 15 }}>
             <span style={{ color: 'blue' }}>{this.state.blockInfo.privateKey}</span>
             <b>PRIVATE KEY</b>
           </div>
         </ModalBody>
         <ModalFooter>
           <Button color='primary' onClick={this.buyBlock}>Buy Title</Button>
           {this.state.ownedList.indexOf(this.state.blockInfo.id) !== -1 ?
             <Button color='secondary' onClick={this.sellBlock}>Sell Title</Button>
              :
              null
            }
         </ModalFooter>
       </Modal>
     </div>
   )
 }
}
//
// const mapStateToProps = state => ({
// })
//
// const mapDispatchToProps = dispatch => bindActionCreators({
// }, dispatch)

export default connect()(Upland)
