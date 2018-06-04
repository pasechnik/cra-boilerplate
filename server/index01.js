import http from 'http'
import IO from 'socket.io-client'
import Koa from 'koa'


const app = new Koa()
const server = http.createServer(app.callback())
const io = IO(server)

const socket = io('ws://35.195.28.154:44300/all')

// socket.on('connect', function () {
//   console.log('connected')
// });

// socket.on('event', function (data) {
//   console.log(data)
// });

server.listen(8080, () => {
  log('Listening on ', server.address().port)
})