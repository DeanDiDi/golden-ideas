import React from 'react';
import Main from './main';
import NavBar from './common/components/NavBar'
import { Admin } from './admin';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route
            exact path="/project"
            render={routeProps => {
              return (
                <div>
                  <NavBar />
                  <Main {...routeProps} />
                </div>
              );
            }}
          />
          <Route
            exact path="/project/:secret"
            render={routeProps => {
              return (
                <div>
                  <NavBar />
                  <Main {...routeProps} />
                </div>
              );
            }}
          />
          <Route
            path="/admin"
            render={routeProps => <Admin {...routeProps} />}
          />
          <Route path="*">
            <Redirect to={"/admin/project"}/>
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
