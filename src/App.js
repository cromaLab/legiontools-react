import React from 'react';
import { Provider } from 'react-redux';
import store from "./store.js"
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import CardGroup from 'react-bootstrap/CardGroup'
import Card from 'react-bootstrap/Card';
import LoginModal from './components/auth/loginModal';
import ExperimentPane from './components/experimentpane/pane';
import LivePane from './components/livepane/pane';

function App() {
  return (
    <div className="App">
      <Navbar bg="light" className="justify-content-between">
        <Navbar.Brand href="#home">
          LEGIONTOOLS
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link href="https://docs.google.com/document/d/e/2PACX-1vSGBJBshLXXbMzG1FMYy5L0fEdT0mwHwLh5o6qZcpSdk3y-Xk9ZIaPBwE5O2NSdCsbQrtrh7-QLzP4z/pub?embedded=true">User Guide</Nav.Link>
            <a href="http://croma.eecs.umich.edu/croma.html" target="_blank" rel="noopener noreferrer">
              <img
                  src="/CROMA_logo.png"
                  height="30"
                  className="d-inline-block align-top"
                  alt="CROMA Lab Logo"
                />
            </a>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Provider store={store}>
        <LoginModal />
        <CardGroup className="w-75 d-flex mx-auto mt-5">
          <Card body className="mx-3">
            <ExperimentPane />
          </Card>
          <Card body className="mx-3">
            <LivePane />
          </Card>
        </CardGroup>
      </Provider>
    </div>
  );
}

export default App;
