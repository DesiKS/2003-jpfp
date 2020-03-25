import React from "react";
import { connect } from "react-redux";
import { fetchStudents } from "../redux/students";

export class AllStudents extends React.Component {
  componentDidMount() {
    this.props.getStudents();
  }
  render() {
    const { students } = this.props;
    if (!students || !students.length) return "No Students"
    return (
      <div>
        <ul>
          {students.map(student => {
            return (
              <li key={student.id}>
                {student.firstName} {student.lastName}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapState = (reduxState) => {
  return {
    students: reduxState.students
  };
};

const mapDispatch = (dispatch) => {
  return {
    getStudents: () => dispatch(fetchStudents())
  };
};

export default connect(mapState, mapDispatch)(AllStudents);
