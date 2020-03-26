import React from 'react';
import { connect } from 'react-redux';
import { fetchCampuses } from '../redux/campuses';

// Notice that we're exporting the AllCampuses component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllCampuses extends React.Component {
  componentDidMount() {
    this.props.getCampuses();
  }

  render() {
    // console.log(this.props);
    return (
      <div>
        <ul>
          {this.props.campuses &&
            this.props.campuses.map(campus => {
              return (
                <li key={campus.id}>
                  {campus.name}
                  <img src={campus.imageUrl} />
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
    campuses: state.campuses
  };
};

const mapDispatch = dispatch => {
  return {
    getCampuses: function() {
      const action = fetchCampuses();
      dispatch(action);
    }
  };
};

export default connect(mapState, mapDispatch)(AllCampuses);
