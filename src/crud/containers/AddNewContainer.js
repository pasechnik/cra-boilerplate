import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col, Button } from 'reactstrap'
import InputsSection from '../components/InputsSection'
import fItemChange from '../actions/itemChange'
import { AddItemRequest as fAddItemRequest } from '../actions/addNewItem'
import { application } from '../models'

class AddNewContainer extends Component {
  static propTypes = {
    data: PropTypes.shape(application.propTypes).isRequired,
    itemChange: PropTypes.func.isRequired,
    AddItemRequest: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { data, itemChange } = this.props
    if (data === undefined || data.id !== undefined) {
      itemChange({
        application: {
          name: '',
          friendlyName: '',
          address: '',
        },
      })
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

  addItem = () => {
    const { data, AddItemRequest } = this.props
    AddItemRequest(data)
  }

  render() {
    const { data } = this.props
    return (
      <div>
        <div>Add New Container</div>
        {data !== undefined ? (
          <div>
            <InputsSection item={data} textFieldChange={this.textFieldChange} />
            <Row style={{ paddingTop: 30 }}>
              <Col md={{ size: 3 }}>
                <Button color="primary" onClick={this.addItem}>
                  Save
                </Button>
              </Col>
            </Row>
          </div>
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.crud.item.data.application,
})

const mapDispatchToProps = {
  itemChange: fItemChange(),
  AddItemRequest: fAddItemRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewContainer)
