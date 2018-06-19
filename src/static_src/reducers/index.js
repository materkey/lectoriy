import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import tabs from './tabs';
// import users from './users';


export default combineReducers({
    routerReducer,
    tabs,
    // courses,
    // videos,
    // collections,
});
