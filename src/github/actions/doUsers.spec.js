import { FETCH_USERS_START } from './consts'
import { doUsers } from './doUsers'

// createAction(FETCH_USERS_START)
describe('users actions', () => {
  it('doUsers should create an action to start search users', () => {
    const payload = 'Test'
    const expectedAction = {
      type: FETCH_USERS_START,
      payload
    }
    expect(doUsers(payload)).toEqual(expectedAction)
  })
})
