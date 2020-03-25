import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink
} from "react-router-dom";
import AllCampuses from "./AllCampuses";
import AllStudents from "./AllStudents";

const Routes = () => {
  return (
    <Router>
      <div>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/campuses">Campuses</NavLink>
        </nav>
        <Switch>
          <Route path="/campuses" component={AllCampuses} />
          <Route path="/students" component={AllStudents} />
          <Route>
            <main>
              <h1>Welcome to the Margaret Hamilton Academy of JavaScript!</h1>
              <p>
                This seems like a nice place to get started with some Routes!
              </p>
            </main>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
