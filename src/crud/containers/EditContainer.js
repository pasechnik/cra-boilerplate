import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap'
import InputsSection from '../components/InputsSection'
import { getItemRequest as fGetItemRequest } from '../actions/getItem'
import fItemChange from '../actions/itemChange'
import { deleteRequest as fDeleteRequest } from '../actions/deleteItem'
import { editItemRequest as fEditItemRequest } from '../actions/editItem'
import { application } from '../models'

class EditContainer extends Component {
  static propTypes = {
    match: PropTypes.shape({
      path: PropTypes.string,
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }).isRequired,
    className: PropTypes.string.isRequired,
    data: PropTypes.shape(application.propTypes).isRequired,
    getItemRequest: PropTypes.func.isRequired,
    editItemRequest: PropTypes.func.isRequired,
    deleteRequest: PropTypes.func.isRequired,
    itemChange: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      modal: false,
    }
  }


  componentDidMount() {
    const { getItemRequest, data, match: { params: { id } } } = this.props
    if (data === undefined || data.id === '' || data.id !== id) {
      getItemRequest(id)
    }
  }

  textFieldChange = (name, value) => {
    const { data, itemChange } = this.props
    itemChange({
      application: {
        ...data,
        [name]: value,
      },
    })
  }

  toggleDialog = () => {
    const { modal } = this.state
    this.setState({ modal: !modal })
  }

  deleteItem = () => {
    const { data, deleteRequest } = this.props
    deleteRequest(data.id)
    this.toggleDialog()
  }

  editItem = () => {
    const { data: { id, ...itemToSend }, editItemRequest } = this.props
    editItemRequest(id, itemToSend)
  }

  render() {
    const { data, match: { params: { id } }, className } = this.props
    const { modal } = this.state
    return (
      <div>
        <div>
          Edit Container
        </div>
        {(data !== undefined && data.id !== '' && data.id === id) ? (
          <div>
            <InputsSection item={data} textFieldChange={this.textFieldChange} />
            <Row style={{ paddingTop: 30 }}>
              <Col md={{ size: 6 }}>
                <Button color='danger' onClick={this.toggleDialog}>
                  Delete
                </Button>
              </Col>
              <Col md={{ size: 3 }}>
                <Button color='primary' onClick={this.editItem}>
                  Save
                </Button>
              </Col>
            </Row>
          </div>) : null
        }
        <Modal isOpen={modal} className={className}>
          <ModalHeader>
            Delete
          </ModalHeader>
          <ModalBody>
            Do you realy want to delete this item?
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={this.deleteItem}>
              Delete
            </Button>
            <Button color='secondary' onClick={this.toggleDialog}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.crud.item.data.application,
})

const mapDispatchToProps = {
  getItemRequest: fGetItemRequest,
  itemChange: fItemChange,
  deleteRequest: fDeleteRequest,
  editItemRequest: fEditItemRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(EditContainer)
