import http from 'http'
import ws from 'ws'
import debug from 'debug'
import { str } from 'the-utils'
import rpn from 'request-promise-native'

const error = debug('app:server:error')
const log = debug('app:server')


const urlGetQuotes = str.template`https://forex.1forge.com/1.0.3/quotes?pairs=${'pairs'}&api_key=${'YOUR_API_KEY'}`
// EURUSD,GBPJPY,AUDUSD
// const urlSpinnakerNew = str.template`${'host'}/pipelines/${'application'}/New Deployment - Services`

const server = http.createServer((req, res) => {
  res.writeHead(404)
  res.end()
})

const wss = new ws.Server({ server })
server.ws = undefined

wss.on('connection', ws => server.ws = ws)

// Quotes API request
const doNewCall = async () => {
  let result = null
  let uri = ''
  try {
    uri = urlGetQuotes({ pairs: 'EURUSD,GBPJPY,AUDUSD', YOUR_API_KEY: 'w2f1DU4AZQFE5plxj0CWFjsrwCP1knUQ' })
    const options = {
      method: 'GET',
      uri,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }
    result = await rpn(options)
  } catch (err) {
    error(`can't parse result from ${uri} Error: ${err.message}`)
    throw err
  }

  server.ws.send(result)
}

const sendQuotes = () => {
  if (server.ws !== undefined && server.ws.readyState === server.ws.OPEN) {

    Promise.resolve()
      .then(() => doNewCall())
      .then(() => setTimeout(sendQuotes, 4000))
      .catch((err) => error(err))
  } else {
    setTimeout(sendQuotes, 5000)
  }
}

server.listen(8080, () => {
  log('Listening on ', server.address().port)
  setTimeout(sendQuotes, 0)
})