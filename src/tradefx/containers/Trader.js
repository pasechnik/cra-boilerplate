import connect from 'react-redux/es/connect/connect'
import { lifecycle } from 'recompose'
import TraderComponent from '../components/Trader'
import {
  doChangePair as changePair,
  doSubscribePair as subscribePair
} from '../actions/pairs'

const mapStateToProps = state => ({
  loading: state.tradefx.quotes.isLoading,
  pairs: state.tradefx.quotes.pairs,
  pair: state.tradefx.quotes.pair,
  oPair: state.tradefx.quotes.oPair,
  amount: state.tradefx.quotes.amount,
  currencyFrom: state.tradefx.quotes.currencyFrom,
  currencyTo: state.tradefx.quotes.currencyTo
})

const mapDispatchToProps = {
  doChangePair: changePair,
  doSubscribePair: subscribePair
}

const enhance = lifecycle({
  componentDidMount() {
    const { doSubscribePair, pair } = this.props

    setTimeout(() => doSubscribePair(pair), 0)
  }
})

export const Trader = connect(
  mapStateToProps,
  mapDispatchToProps
)(enhance(TraderComponent))
export default Trader
