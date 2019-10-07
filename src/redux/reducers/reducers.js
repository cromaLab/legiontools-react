import loginReducers from './loginReducers.js';
import livePaneReducers from './livePaneReducers.js';
import { combineReducers } from 'redux';


const reducer = combineReducers({
    loginReducers,
    livePaneReducers
});

export default reducer;
