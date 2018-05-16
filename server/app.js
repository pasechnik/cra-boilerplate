var http = require('http');
var WebSocket = require('ws');


var server = http.createServer(function (request, response) {
  response.writeHead(404);
  response.end();
});

var wss = new WebSocket.Server({ server });

wss.on('connection', function (ws) {

  ws.on('message', function (message) {
    console.log('received: ', message);
  });

  function sendNumber() {
    if (ws.readyState === ws.OPEN) {
      var number = Math.round(Math.random() * 0xFFFFFF);
      ws.send(number.toString());
      setTimeout(sendNumber, 1000);
    }
  }
  sendNumber();
});

server.listen(8080, function () {
  console.log('Listening on ', server.address().port);
});