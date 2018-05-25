import React, { Component } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap'


const HocModal = ChildComponent => class HocComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modal: true,
      nestedModal: false,
    }
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    })
  }

  toggleNested = () => {
    this.setState({
      nestedModal: !this.state.nestedModal,
    })
  }


  render() {
    return (
      <Modal isOpen={this.state.modal} backdrop='static' className='quote-modal'>
        <ModalBody>
          <ChildComponent {...this.props} toggle={this.toggle} />
          <Modal
            isOpen={this.state.nestedModal}
            toggle={this.toggleNested}
          >
            <ModalHeader>Terms of Condition</ModalHeader>
            <ModalBody>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type
                 specimen book. It has survived not only five centuries, but also the leap into
                 electronic typesetting, remaining essentially unchanged. It was popularised
                 in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                  and more recently with desktop publishing software like Aldus PageMaker
                  including versions of Lorem Ipsum.
            </ModalBody>
            <ModalFooter>
              <Button onClick={this.toggleNested}>OK</Button>
            </ModalFooter>
          </Modal>
        </ModalBody>
        <ModalFooter>
          <div>
            by Clicking anywhere in the page, I Agree to the
            Terms of Condition specified
            <Button
              color='link'
              onClick={this.toggleNested}
              onKeyPress={this.toggleNested}
            >
              here
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    )
  }
}

export default HocModal
