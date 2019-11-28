import React from 'react';
import NavBar from './common/components/NavBar'
import Main from './main/Main';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <Route exact path="/" component={Main} />
        <Route exact path="/:secret" component={Main} />
      </Router>
    </Provider>
  );
}

export default App;
