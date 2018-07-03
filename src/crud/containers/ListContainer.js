import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { makeDataRequest } from '../actions/makeDataRequest'
import { AddItemRequest } from '../actions/addNewItem'
import { deleteRequest } from '../actions/deleteItem'
import { NavLink, Link } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'


import '../style.css'

class ListContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modal: false,
      idToDelete: null,
    }
  }

  addItem = ({ id, name, ...item }) => {
    this.props.AddItemRequest({ ...item, name: `${name} copy` })
  }
  toggleDialog = (id = null) => {
    this.setState({ modal: !this.state.modal, idToDelete: id })
  }
  deleteItem = () => {
    this.props.deleteRequest(this.state.idToDelete)
    this.toggleDialog()
  }
  componentDidMount() {
    this.props.makeDataRequest()
  }
  render() {
    return (
      <div>
        <div style={{ paddingBottom: 10 }}>List Container</div>
        <table className='list_table'>
          <tbody>
            <tr>
              <th>№</th>
              <th>Name</th>
              <th>ID</th>
              <th>Friendly Name</th>
              <th>Address</th>
              <th colSpan={3} style={{ textAlign: 'center' }}>Controls</th>
            </tr>
            {this.props.data.applications && this.props.data.applications.map((item, i) => (
              <tr key={item.id}>
                <td>{i + 1}</td>
                <td>{item.name}</td>
                <td>{item.id}</td>
                <td>{item.friendlyName}</td>
                <td>{item.address}</td>
                <td>
                  <Link className='edit_link' to={{ pathname: `/crud/edit/${item.id}` }}>
                    Edit
                  </Link>
                </td>
                <td>
                  <a className='copy_link' onClick={() => this.addItem(item)}>
                    Copy
                  </a>
                </td>
                <td>
                  <a className='delete_link' onClick={() => this.toggleDialog(item.id)}>
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal isOpen={this.state.modal} className={this.props.className}>
          <ModalHeader >Delete</ModalHeader>
          <ModalBody>
            Do you realy want to delete this item?
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={this.deleteItem}>Delete</Button>
            <Button color='secondary' onClick={this.toggleDialog}>Cancel</Button>
          </ModalFooter>
        </Modal>

      </div>
    )
  }
}

ListContainer.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
}

const mapStateToProps = state => ({
  data: state.crud.applications.data,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  makeDataRequest,
  AddItemRequest,
  deleteRequest,

}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer)
