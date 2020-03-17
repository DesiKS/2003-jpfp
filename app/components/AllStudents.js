import React from 'react';


export default class AllStudents extends React.Component {

  render() {
    return (
      <div />
    )
  }

}

// Currently, we're just exporting the component as-is. When we're ready to
// hook it up to the redux store, we'll export the connected component by default:
// Remember to remove the export default listed above once your ready to export!
// export default connect(mapState, mapDispatch)(AllStudents)
