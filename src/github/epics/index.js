import { combineEpics } from 'redux-observable'

// import your Home Module epics here and combine them
// Place all epics in same directory
import repos from './fetchUserRepos'
import users from './fetchUsers'

const github = combineEpics(repos, users)

export default github
