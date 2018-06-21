import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import tabs from './tabs';
import courses from './courses';
import lecturers from './lecturers';
import videos from './videos';
import users from './users';
// import users from './users';


export default combineReducers({
    routerReducer,
    tabs,
    courses,
    lecturers,
    videos,
    users,
    // courses,
    // videos,
    // collections,
});
