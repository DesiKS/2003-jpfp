import axios from 'axios'
export const SET_CAMPUSES = 'SET_CAMPUSES'

export const setCampuses = (campuses) => {
  return {
    type: SET_CAMPUSES,
    campuses
  }
}

export const fetchCampuses = () => {
  return async (dispatch) => {
    const { data } = await axios.get('/api/campuses')
    dispatch(setCampuses(data))
  }
}

export default function campusesReducer(state = [], action) {
  switch (action.type) {
    case SET_CAMPUSES:
      return action.campuses
    default:
      return state
  }
}
