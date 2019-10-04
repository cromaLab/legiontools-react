
import { createStore } from 'redux';
import reducer from './redux/reducers/reducers.js';

// Initialize redux store
const store = createStore(reducer);

export default store;
