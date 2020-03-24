import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import AllCampuses from "./AllCampuses";
import { Provider } from "react-redux";

const Root = () => {
  return (
    // <Provider>
      <Router>
        <div>
          <nav>
            Welcome!
            <NavLink to="/">Home</NavLink>
            <NavLink to="/campuses">Campuses</NavLink>
          </nav>
          <Switch>
            <Route path="/campuses" component={AllCampuses} />
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
    // </Provider>
  );
};

export default Root;
