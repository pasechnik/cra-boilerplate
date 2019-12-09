import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import get from 'lodash/get'
import { Link } from 'react-router-dom'
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap'
import { makeCategoriesRequest as fMakeCategoriesRequest } from '../actions/makeDataRequest'
// import { AddItemRequest as fAddItemRequest } from '../actions/addNewItem'
// import { deleteRequest as fDeleteRequest } from '../actions/deleteItem'
import '../style.css'
import { category } from '../models/category'

class ListContainer extends Component {
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape(category.propTypes))
      .isRequired,
    // AddItemRequest: PropTypes.func.isRequired,
    // deleteRequest: PropTypes.func.isRequired,
    makeCategoriesRequest: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      idToDelete: null
    }
  }

  componentDidMount() {
    const { makeCategoriesRequest } = this.props
    makeCategoriesRequest()
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
    const { categories, products } = this.props
    console.log({ categories, products })
    return (
      <React.Fragment>
        <div style={{ paddingBottom: 10 }}>List Categories</div>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>ID</th>
              <th>Description</th>
              <th colSpan={3} style={{ textAlign: 'center' }}>
                Controls
              </th>
            </tr>
          </thead>
          <tbody>
            {categories &&
              categories.map((item, i) => (
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
                  <td>{item.categoryId}</td>
                  <td>{item.description}</td>
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
          <ModalBody>Do you really want to delete this item?</ModalBody>
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
  products: get(state, 'catalog.products.data', []),
  categories: get(state, 'catalog.categories.data', [])
})

const mapDispatchToProps = {
  makeCategoriesRequest: fMakeCategoriesRequest
  // AddItemRequest: fAddItemRequest,
  // deleteRequest: fDeleteRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer)
