import axios from 'axios';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from './Login';
import Dashboard from './Dashboard';
import PrivateRoute from '../components/PrivateRoute';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      token: null,
    };
    this.autheticate = this.autheticate.bind(this);
    this.logout = this.logout.bind(this);
  }

  autheticate(username, password) {
    return new Promise((resolve, reject) => {
      axios.post('/api/admin/auth', { username, password })
      .then((response) => {
        this.setState({
          isAuthenticated: true,
          authToken: response.data.token,
        });
        resolve(true);
      })
      .catch((error) => {
        console.log('error when authenticating admin user\n', error.response);
        resolve(false);
      });
    });
  }

  logout() {
    this.setState({ isAuthenticated: false });
  }

  render() {
    const { isAuthenticated, authToken } = this.state;

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
            <Dashboard
              authToken={authToken}
            />
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
