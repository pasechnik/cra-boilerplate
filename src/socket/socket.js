export default () => {

  const socket = new WebSocket('ws://localhost:8080/')

  socket.onopen = () => {
    console.log('WS Open!')

    socket.send('hello from client')
  }

  socket.onmessage = (message) => {
    console.log(message.data)
  }

  return socket
}
