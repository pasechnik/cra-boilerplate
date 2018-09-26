import connect from 'react-redux/es/connect/connect'
import TraderComponent from '../components/Trader'

const mapStateToProps = state => ({
  loading: state.tradefx.quotes.isLoading,
  pairs: state.tradefx.quotes.pairs,
  amount: state.tradefx.quotes.amount,
  currencyFrom: state.tradefx.quotes.currencyFrom,
  currencyTo: state.tradefx.quotes.currencyTo,
})

const mapDispatchToProps = {}

export const Trader = connect(mapStateToProps, mapDispatchToProps)(TraderComponent)
export default Trader
