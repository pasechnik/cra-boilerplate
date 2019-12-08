import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { obj } from 'the-utils'
import { Link } from 'react-router-dom'
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap'
import { makeDataRequest as fMakeDataRequest } from '../actions/makeDataRequest'
import { AddItemRequest as fAddItemRequest } from '../actions/addNewItem'
import { deleteRequest as fDeleteRequest } from '../actions/deleteItem'
import { application } from '../models'

import '../style.css'

class ListContainer extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape(application.propTypes)).isRequired,
    AddItemRequest: PropTypes.func.isRequired,
    deleteRequest: PropTypes.func.isRequired,
    makeDataRequest: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      modal: false,
      idToDelete: null
    }
  }

  componentDidMount() {
    const { makeDataRequest } = this.props
    makeDataRequest()
  }

  addItem = ({ id, name, ...item }) => {
    const { AddItemRequest } = this.props
    AddItemRequest({
      ...item,
      name: `${name} copy`
    })
  }

  toggleDialog = (id = null) => {
    const { modal } = this.state
    this.setState({
      modal: !modal,
      idToDelete: id
    })
  }

  deleteItem = () => {
    const { idToDelete } = this.state
    const { deleteRequest } = this.props
    deleteRequest(idToDelete)
    this.toggleDialog()
  }

  render() {
    const { modal } = this.state
    const { data } = this.props
    return (
      <React.Fragment>
        <div style={{ paddingBottom: 10 }}>List Container</div>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>ID</th>
              <th>Friendly Name</th>
              <th>Address</th>
              <th colSpan={3} style={{ textAlign: 'center' }}>
                Controls
              </th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, i) => (
                <tr key={item.id}>
                  <th scope="row">{i + 1}</th>
                  <td>
                    <Link
                      to={{ pathname: `/crud/edit/${item.id}` }}
                      href={`/crud/edit/${item.id}`}
                    >
                      {item.name}
                    </Link>
                  </td>
                  <td>{item.id}</td>
                  <td>{item.friendlyName}</td>
                  <td>{item.address}</td>
                  <td>
                    <Link
                      className="btn btn-outline-primary"
                      to={{ pathname: `/crud/edit/${item.id}` }}
                      href={`/crud/edit/${item.id}`}
                    >
                      Edit
                    </Link>
                  </td>
                  <td>
                    <Button
                      outline
                      color="info"
                      onClick={() => this.addItem(item)}
                    >
                      Copy
                    </Button>
                  </td>
                  <td>
                    <Button
                      outline
                      color="danger"
                      onClick={() => this.toggleDialog(item.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <Modal isOpen={modal}>
          <ModalHeader>Delete</ModalHeader>
          <ModalBody>Do you realy want to delete this item?</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.deleteItem}>
              Delete
            </Button>
            <Button color="secondary" onClick={this.toggleDialog}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  data: obj.deep(state, ['crud', 'applications', 'data', 'applications'], [])
})

const mapDispatchToProps = {
  makeDataRequest: fMakeDataRequest,
  AddItemRequest: fAddItemRequest,
  deleteRequest: fDeleteRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer)
