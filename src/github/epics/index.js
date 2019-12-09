import { combineEpics } from 'redux-observable'

// import your Home Module epics here and combine them
// Place all epics in same directory
import repos from './fetchUserRepos'
import users from './fetchUsers'
import afterSetUser from './afterSetUser'
import fetchUserInfo from './fetchUserInfo'
import doUserGet from './doUserGet'

const github = combineEpics(
  repos,
  users,
  afterSetUser,
  fetchUserInfo,
  doUserGet
)

export default github
