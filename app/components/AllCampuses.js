import React from "react";
import { connect } from "react-redux";

// You are expected to dispatch a thunk to fetch the campuses from the server,
// store the campuses in the Redux store, and use mapState to pass these
// campuses to AllCampuses as props.

// You are NOT expected to fetch the campuses and store them in this component's
// state.
export class AllCampuses extends React.Component {

  render() {
    return (
      <div />
    );
  }
}

const mapState = (reduxState) => {
  return {

  }
}

const mapDispatch = (dispatch) => {
  return {

  }
}

// Currently, we're just exporting the component as-is. When we're ready to
// hook it up to the redux store, we'll export the connected component by default:
// Remember to remove the export default listed above once your ready to export!
export default connect(mapState, mapDispatch)(AllCampuses)
// export default AllCampuses
