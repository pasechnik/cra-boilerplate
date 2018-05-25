import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'reactstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ws from '../../socket/socket'
import HocModal from '../HOC/HocModal'
import Quote from '../components/Quote'

class QuotesList extends Component {
  constructor(props) {
    super(props)

    this.socket = null
  }

  componentDidMount() {
    this.socket = ws()
    this.socket.open()
  }

  componentWillUnmount() {
    this.socket.close()
  }

  handleSell = () => {

  }

  render() {
    const { quotes } = this.props
    let pageContent = ''

    if (this.props.loading) {
      pageContent = (
        <div className='loader'>
          Loading...
        </div>
      )
    } else {
      pageContent = (
        <React.Fragment>
          <Row>
            <Col>
              <div className='d-flex justify-content-between' >
                <h3 className='font-weight-bold'>Trending Now</h3>
                <Link to='/quotes' href='/quotes' className='quote_close-btn'>×</Link>
              </div >
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <p className='font-weight-bold'>Follow our most experienced traders:</p>
            </Col>
          </Row >
          <div className='trader-table'>
            <Container>
              <Row>
                <Col xs='2' className='bg-dark text-white trader-table_header'>Instrument</Col>
                <Col xs='4' className='bg-dark text-white trader-table_header text-center'>Bid</Col>
                <Col xs='4' className='bg-dark text-white trader-table_header text-center'>Ask</Col>
                <Col xs='2' className='bg-dark text-white trader-table_header'>Change</Col>
              </Row>
              {quotes.map(quote => <Quote key={quote.SYMBOL} {...quote} />)}
            </Container>
          </div>
        </React.Fragment >
      )
    }

    return (
      <React.Fragment>
        {pageContent}
      </React.Fragment>
    )
  }
}

QuotesList.propTypes = {
  quotes: PropTypes.arrayOf(PropTypes.shape({
    SYMBOL: PropTypes.string,
    TIME: PropTypes.string,
    BID: PropTypes.number,
    ASK: PropTypes.number,
    LOW: PropTypes.number,
    HIGH: PropTypes.number,
    DIRECTION: PropTypes.number,
    DIGITS: PropTypes.number,
    SPREAD: PropTypes.number,
    MODIFY_TIME: PropTypes.string,
    CONTRACT_SIZE: PropTypes.number,
  })).isRequired,
  loading: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  quotes: state.quotes.newQuotes.quotes,
  loading: state.quotes.newQuotes.isLoading,
})

export default connect(mapStateToProps)(HocModal(QuotesList))