import fetch from 'isomorphic-fetch'
import config from '../config'

const sendNotification = (account, amount, status) => () => {
  const params = `accountId=${account}&amount=${amount}&action=deposit_${status}`
  const url = `/wp-content/themes/freshdesign/includes/ajax-handler-deposit.php?action=deposit_${status}`
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    },
    cache: 'no-cache',
    body: params,
    credentials: 'same-origin',
  })
    .then(response => {
      if (response.ok) {
        const contentType = response.headers.get('Content-Type') || ''

        if (contentType.includes('application/json')) {
          // return response.json().catch(error => Promise.reject(new ResponseError('Invalid JSON: ' + error.message)))
          return response.json().catch(error => Promise.reject(new Error(`Invalid JSON: ${error.message}`)))
        }

        if (contentType.includes('text/html')) {
          return response
            .text()
            .then(html => ({
              page_type: 'generic',
              html,
            }))
            .catch(error => Promise.reject(new Error(`HTML error: ${error.message}`)))
        }

        return Promise.reject(new Error(`Invalid content type: ${contentType}`))
      }
      if (response.status === 404) {
        return Promise.reject(new Error(`Page not found: ${url}`))
      }
      return Promise.reject(new Error(`HTTP error: ${response.status}`))
    })
    .catch(error => Promise.reject(new Error(error.message)))
}

export default sendNotification
