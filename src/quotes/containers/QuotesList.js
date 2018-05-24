import React, { Component } from 'react'
import { Table } from 'reactstrap'
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
    let i = 0

    if (this.props.loading) {
      pageContent = (
        <div className='loader'>
          Loading...
        </div>
      )
    } else {
      pageContent = (
        <div>
          <div className='d-flex justify-content-between' >
            <span></span>
            <h3 className='font-weight-bold'>Trending Now</h3>
            <Link to='/quotes' className='quote_close-btn'>×</Link>
          </div >
          <hr />
          <p className='font-weight-bold'>Follow our most experienced traders:</p>
          <Table responsive>
            <thead>
              <tr>
                <th className='bg-dark text-white'>Instrument</th>
                <th className='bg-dark text-white text-center'>Bid</th>
                <th className='bg-dark text-white text-center'>Ask</th>
                <th className='bg-dark text-white text-center'>Change</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map(quote => <Quote key={quote.SYMBOL} {...quote} className={`quote-${i++}`} />)}
            </tbody>
          </Table>
        </div>
      )
    }

    return (
      <React.Fragment>
        {pageContent}
      </React.Fragment>
    )
  }
}


const mapStateToProps = state => ({
  quotes: state.quotes.newQuotes.quotes,
  loading: state.quotes.newQuotes.isLoading,
})

export default connect(mapStateToProps)(HocModal(QuotesList))
