export default () => {
  let socket

  const open = () => {
    socket = new WebSocket('ws://localhost:8080')

    socket.onopen = () => {
      console.log('WS Open!')

      socket.send('hello from client')
    }

    socket.onmessage = ({ data }) => {
      console.log(JSON.parse(data))
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
