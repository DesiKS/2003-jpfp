import axios from "axios";

const SET_STUDENTS = "SET_STUDENTS";

export const setStudents = students => {
  return {
    type: SET_STUDENTS,
    students
  };
};

export const fetchStudents = () => {
  return async dispatch => {
    const { data } = await axios.get("/api/students");
    dispatch(setStudents(data));
  };
};

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
export default function studentsReducer(state = [], action) {
  // return null;
  switch (action.type) {
    case SET_STUDENTS:
      return action.students;
    default:
      return state;
  }
}
