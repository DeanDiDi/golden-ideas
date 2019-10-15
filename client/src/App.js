import React from 'react';
import NavBar from './common/components/NavBar'
import Main from './main/Main';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <NavBar />
        <Main />
      </div>
    </Provider>
  );
}

export default App;
