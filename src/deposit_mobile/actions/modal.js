import { createAction } from 'redux-actions'
import { SET_MODAL, SET_MODAL_SUCCESS, SET_LOADING, SEND_NOTIFICATION_START, SEND_NOTIFICATION_SUCCESS } from './consts'

export const setModal = createAction(SET_MODAL)
export const setModalSuccess = createAction(SET_MODAL_SUCCESS)
export const setLoading = createAction(SET_LOADING)
export const sendNotificationSuccess = createAction(SEND_NOTIFICATION_SUCCESS)
export const sendNotification = createAction(SEND_NOTIFICATION_START, (account, amount, status) => ({
  account,
  amount,
  status,
}))
