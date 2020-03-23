import { combineReducers } from 'redux'
import campusesReducer from './campuses'

// This reducer is just a stub. We should probably do something
// with that combineReducers thing up there...
const appReducer = combineReducers({
  campuses: campusesReducer
})

export default appReducer
