import React from 'react';
import { Provider } from 'react-redux';
import store from "./store.js"
import './App.css';
import LoginModal from './components/auth/loginModal';
import RecruitingPanel from './components/recruiting/recruitingPanel';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <LoginModal />
        <h1>Hello.</h1>
        <RecruitingPanel />
      </Provider>
    </div>
  );
}

export default App;
