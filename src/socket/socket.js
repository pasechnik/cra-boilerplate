import store from '../store'
import { RECEIVE_QUOTES_FAILED } from '../quotes/actions/actionTypes'
import {
  // receiveQuotes,
  receiveQuotesFulfilled,
} from '../quotes/actions/receiveQuotes'


export default () => {
  let socket

  const open = () => {
    socket = new WebSocket('ws://localhost:8080')
    const { dispatch } = store

    const state = store.getState()
    // dispatch(receiveQuotes())
    dispatch(receiveQuotesFulfilled(state.quotes.newQuotes.quotes))

    socket.onopen = () => {
      // console.log('WS Open!')
      socket.send('hello from client')
    }

    try {
      socket.onmessage = ({ data }) => {
        const res = JSON.parse(data)
        dispatch(receiveQuotesFulfilled(res))
      }
    } catch (err) {
      dispatch({
        type: RECEIVE_QUOTES_FAILED,
        // payload: err.xhr.response,
        payload: 'error',
        error: true,
      })
    }

    socket.onclose = () => {
      // console.log('WS Closed!')
    }
  }

  const close = () => {
    if (socket) socket.close()
  }

  return {
    open,
    close,
  }
}
