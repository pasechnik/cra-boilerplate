import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { makeDataRequest } from '../actions/makeDataRequest'
import { AddItemRequest } from '../actions/addNewItem'
import { NavLink, Link } from 'react-router-dom'
import '../style.css'

class ListContainer extends Component {
  constructor(props) {
    super(props)
  }
  addItem = ({ id, name, ...item}) => {
    this.props.AddItemRequest({...item, name:`${name} copy`})
  }
  componentDidMount() {
    this.props.makeDataRequest()
  }
  render() {
    console.log(this.props)
    console.log(this.props.data)
    return (
      <div>
        <div style={{paddingBottom: 10}}>List Container</div>
        <table className="list_table">
          <tbody>
            <tr>
              <th>№</th>
              <th>Name</th>
              <th>ID</th>
              <th>Friendly Name</th>
              <th>Address</th>
              <th colSpan={3} style={{textAlign: 'center'}}>Controls</th>
            </tr>
            {this.props.data && this.props.data.map((item, i) => (
              <tr key={item.id}>
                <td>{i + 1}</td>
                <td>{item.name}</td>
                <td>{item.id}</td>
                <td>{item.friendlyName}</td>
                <td>{item.address}</td>
                <td>
                  <Link className="edit_link" to={{ pathname: `/crud/edit/${item.id}` }}>
                    Edit
                  </Link>
                </td>
                <td>
                  <a className="copy_link" onClick={() => this.addItem(item)}>
                    Copy
                  </a>
                </td>
                <td>
                  <a className="delete_link">
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
  data: state.crud.applications.data.applications,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  makeDataRequest,
  AddItemRequest,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer)
