import axios from "axios";

const SET_CAMPUSES = "SET_CAMPUSES"

export const setCampuses = (campuses) => ({
  type: "SET_CAMPUSES",
  campuses
});

export const fetchCampuses = () => {
  return async (dispatch) => {
    const { data } = await axios.get("/api/campuses");
    dispatch(setCampuses(data));
  }
};

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
export default function campusesReducer(state = [], action) {
  // return null;
  switch (action.type) {
    case SET_CAMPUSES:
      return action.campuses;
    default:
      return state;
  }
}
