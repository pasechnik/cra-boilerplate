import http from 'http'
// import json from 'json-promise'
import ws from 'ws'
import debug from 'debug'
import { str } from 'the-utils'
import rpn from 'request-promise-native'

const error = debug('app:server:error')
const log = debug('app:server')


const urlGetQuotes = str.template`https://forex.1forge.com/1.0.3/quotes?pairs=${'pairs'}&api_key=${'YOUR_API_KEY'}`
// EURUSD,GBPJPY,AUDUSD
// const urlSpinnakerNew = str.template`${'host'}/pipelines/${'application'}/New Deployment - Services`

var server = http.createServer(function (request, response) {
  response.writeHead(404);
  response.end();
});

var wss = new ws.Server({ server });
server.ws = undefined

wss.on('connection', function (ws) {

  server.ws = ws
  ws.on('message', function (message) {
    log('received: ', message);
  });

});

const doNewCall = async () => {
  let result = null
  let uri = ''
  try {
    uri = urlGetQuotes({ pairs: 'EURUSD,GBPJPY,AUDUSD', YOUR_API_KEY: 'pcQ8xLrcVosH3Vzd5ZuQ1cIub41Indmn' })
    log(`making GET ${uri}`)
    const options = {
      method: 'GET',
      uri,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }
    const s = await rpn(options)
    result = s //await json.pars
  } catch (err) {
    error(`can't parse result from ${uri} Error: ${err.message}`)
    throw err
  }

  server.ws.send(result)
  // return result
}

function sendNumber() {
  log('settimeout')
  if (server.ws !== undefined && server.ws.readyState === server.ws.OPEN) {

    // Quotes API request
    Promise.resolve()
      .then(() => doNewCall())
      .then(() => setTimeout(sendNumber, 4000))
      .catch((err) => error(err))
  } else {
    setTimeout(sendNumber, 5000)
  }
}

server.listen(8080, function () {
  log('Listening on ', server.address().port);
  setTimeout(sendNumber, 0);
});