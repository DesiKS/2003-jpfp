import React from "react";
import { connect } from "react-redux";

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

const mapState = () => {
  return {};
};

const mapDispatch = () => {
  return {};
};

export default connect(mapState, mapDispatch)(AllStudents);
