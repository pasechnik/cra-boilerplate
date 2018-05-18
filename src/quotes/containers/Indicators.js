import React, { Component } from 'react'
import { Table } from 'reactstrap'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ws from '../../socket/socket'
import Quote from '../components/Quote'

class Indicators extends Component {
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

  render() {
    const { quotes } = this.props
    let pageContent = ''
    let key = 0

    if (this.props.loading) {
      pageContent = (
        <div className='loader'>
          Loading...
        </div>
      )
    } else {
      pageContent = (
        <div>
          <h3>Trending Now</h3>
          <hr className='my-3' />
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
              {quotes.map(quote => <Quote key={key++} {...quote} />)}
            </tbody>
          </Table>
        </div>
      )
    }

    return (
      <div>
        {pageContent}
      </div>
    )
  }
}


const mapStateToProps = state => ({
  quotes: state.quotes.newQuotes.quotes,
  loading: state.quotes.newQuotes.isLoading,
})

export default connect(mapStateToProps)(Indicators)
