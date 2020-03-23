import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AllCampuses from "./AllCampuses";
import { Provider } from "react-redux";

const Root = () => {
  return (
    // <Provider>
      <Router>
        <nav>Welcome!</nav>
        <Switch>
          <Route path="/campuses" component={AllCampuses} />
        </Switch>
        <main>
          <h1>Welcome to the Margaret Hamilton Academy of JavaScript!</h1>
          <p>This seems like a nice place to get started with some Routes!</p>
        </main>
      </Router>
    // </Provider>
  );
};

export default Root;
