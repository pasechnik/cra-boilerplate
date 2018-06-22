import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import InputsSection from '../components/InputsSection'
import { getItemRequest } from '../actions/getItem'
import { itemChange } from '../actions/itemChange'
import { deleteRequest } from '../actions/deleteItem'
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

class AddNewContainer extends Component {
  constructor(props){
    super(props)

    this.state = {
      modal: false,
    }
  }
  componentDidMount() {
    if (this.props.data === undefined || this.props.data.id !== undefined) {
      this.props.itemChange({application:{name:'', friendlyName:'', address:'',}})
    }
  }
  textFieldChange = (name, value) => {
    this.props.itemChange({application:{...this.props.data, [name]: value}})
  }
  toggleDialog = () => {
    this.setState({modal: !this.state.modal})
  }
  deleteItem = () => {
    this.props.deleteRequest(this.props.data.id)
    this.toggleDialog()
  }

  render() {
    return (
      <div>
        <div>Edit Container</div>
        {this.props.data != undefined ?
          <div>
            <InputsSection item={this.props.data} textFieldChange={this.textFieldChange} />
            <Row style={{paddingTop: 30}}>
              <Col md={{ size: 3 }}><Button color="primary">Save</Button></Col>
            </Row>
          </div>
           : null
        }
        <Modal isOpen={this.state.modal} className={this.props.className}>
          <ModalHeader >Delete</ModalHeader>
          <ModalBody>
            Do you realy want to delete this item?
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.deleteItem}>Delete</Button>
            <Button color="secondary" onClick={this.toggleDialog}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.crud.item.data.application
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getItemRequest,
  itemChange,
  deleteRequest,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AddNewContainer)
