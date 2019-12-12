import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from './Login';
import Project from './Project';
import PrivateRoute from '../components/PrivateRoute';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
    };
    this.autheticate = this.autheticate.bind(this);
    this.logout = this.logout.bind(this);
  }

  autheticate() {
    this.setState({ isAuthenticated: true });
  }

  logout() {
    this.setState({ isAuthenticated: false });
  }

  render() {
    const { isAuthenticated } = this.state;

    return (
      <Router>
        <Switch>
          <Route exact path="/admin/login">
            <Login
              isAuthenticated={isAuthenticated}
              autheticate={this.autheticate}
            />
          </Route>
          <PrivateRoute
            exact path="/admin/project"
            isAuthenticated={isAuthenticated}
          >
            <Project />
          </PrivateRoute>
          <Route path="*">
            <Redirect to={"/admin/login"}/>
          </Route>
        </Switch>
      </Router>
    );
  }
}


export default Admin;
