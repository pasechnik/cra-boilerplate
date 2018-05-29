import { TAKE_LOCATION } from './actionTypes'


export default function takeLocation(payload) {
  return {
    type: TAKE_LOCATION,
    payload,
  }
}
