
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from './redux/reducers/reducers.js';

// Initialize redux store
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
