import React from "react";
import { connect } from "react-redux";
import { fetchCampuses } from "../redux/campuses";

// You are expected to dispatch a thunk to fetch the campuses from the server,
// store the campuses in the Redux store, and use mapState to pass these
// campuses to AllCampuses as props.

// You are NOT expected to fetch the campuses and store them in this component's
// state.
export class AllCampuses extends React.Component {
  componentDidMount() {
    this.props.getCampuses();
  }
  render() {
    return (
      <div>
        <ul>
          {this.props.campuses && this.props.campuses.length
            ? this.props.campuses.map(campus => {
                return (
                  <li key={campus.id}>
                    <div>{campus.name}</div>
                    <img src={campus.imageUrl} />
                  </li>
                );
              })
            : "No Campuses"}
        </ul>
      </div>
    );
  }
}

const mapState = reduxState => {
  return {
    campuses: reduxState.campuses
  };
};

const mapDispatch = dispatch => {
  return {
    getCampuses: () => dispatch(fetchCampuses())
  };
};

export default connect(mapState, mapDispatch)(AllCampuses);
