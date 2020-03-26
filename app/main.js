import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import store from './store';
import Routes from './components/Routes';
import AllCampuses from './components/AllCampuses';

render(
  <Provider store={store}>
    {/* <Routes /> */}
    <Router>
      <Switch>
        <Route path="/" component={Routes} />
        <Route path="/campuses" component={AllCampuses} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('main')
);
