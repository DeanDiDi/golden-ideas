import React from 'react';
import NavBar from './common/components/NavBar'
import Main from './main';
import Admin from './admin';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/:secret" component={Main} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
