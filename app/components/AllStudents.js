import React from 'react';
import { connect } from 'react-redux';
import { fetchStudents } from '../redux/students';

// Notice that we're exporting the AllStudents component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllStudents extends React.Component {
  componentDidMount() {
    this.props.getStudents();
  }

  render() {
    // console.log(this.props);
    return (
      <div>
        <ul>
          {this.props.students.map(student => {
            return (
              <li key={student.id}>
                {`${student.firstName} ${student.lastName}`}
                {/* <img src={student.imageUrl} /> */}
              </li>
            );
          })}
        </ul>
      </div>
      // <h1>here!!!!!!!!!!!!!!!!!!</h1>
    );
  }
}

const mapState = state => {
  return {
    students: state.students
  };
};

const mapDispatch = dispatch => {
  return {
    getStudents: function() {
      const action = fetchStudents();
      dispatch(action);
    }
  };
};

export default connect(mapState, mapDispatch)(AllStudents);
