import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import InputsSection from '../components/InputsSection'
import itemChange from '../actions/itemChange'
import { AddItemRequest } from '../actions/addNewItem'
import { Container, Row, Col, Button } from 'reactstrap'

class AddNewContainer extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    if (this.props.data === undefined || this.props.data.id !== undefined) {
      this.props.itemChange({ application: { name: '', friendlyName: '', address: '' } })
    }
  }
  textFieldChange = (name, value) => {
    this.props.itemChange({ application: { ...this.props.data, [name]: value } })
  }
  addItem = () => {
    this.props.AddItemRequest(this.props.data)
    console.log('bom=', this.props.data)
  }

  render() {
    return (
      <div>
        <div>Add New Container</div>
        {this.props.data != undefined ?
          <div>
            <InputsSection item={this.props.data} textFieldChange={this.textFieldChange} />
            <Row style={{ paddingTop: 30 }}>
              <Col md={{ size: 3 }}><Button color='primary' onClick={this.addItem}>Save</Button></Col>
            </Row>
          </div>
           : null
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.crud.item.data.application,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  itemChange,
  AddItemRequest,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AddNewContainer)
