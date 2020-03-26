import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import store from './store';
import Routes from './components/Routes';
import AllCampuses from './components/AllCampuses';
import AllStudents from './components/AllStudents';

render(
  <Provider store={store}>
    {/* <Routes /> */}
    <Router>
      <Switch>
        <Route exact path="/" component={Routes} />
        <Route exact path="/campuses" component={AllCampuses} />
        <Route exact path="/students" component={AllStudents} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('main')
);
