import { CLEAR_NOTIFICATION } from './consts'


export function clearNotification(payload) {
  return {
    type: CLEAR_NOTIFICATION,
    payload,
  }
}
