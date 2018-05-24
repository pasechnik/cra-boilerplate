import React, { Component } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'reactstrap'
import QuotesList from './containers/QuotesList'
import Order from './containers/Order'
import './style.css'

class Quotes extends Component {

  constructor(props) {
    super(props)

    this.state = {
      modal: false
    }
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal })
  }

  render() {
    return (
      <div id='quotes'>
        <Container>
          <Row>
            <Col>
              <h2 className='text-center'>Quotes</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <Link to='/quotes/list'><Button>Start Trading</Button></Link>
            </Col>
          </Row>
          <Row>
            <Col>
              <Switch>
                <Route
                  exact path={`${this.props.match.path}/list`}
                  render={() => <QuotesList
                    modal={this.state.modal}
                    toggle={this.toggle}
                  />}
                />
                <Route path={`${this.props.match.path}/list/:SYMBOL`} component={Order} />
              </Switch>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Quotes
