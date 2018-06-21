import update from 'react-addons-update';
import { START_COURSE_LOADING, SUCCESS_COURSE_LOADING, ERROR_COURSE_LOADING } from '../actions/courses';


const initialState = {
    lecturers: {},
};


export default function courses(store = initialState, action) {
    let newStore = store;
    if (action.payload && action.payload.entities && action.payload.entities.lecturers) {
        newStore = update(store, {
            lecturers: { $merge: action.payload.entities.lecturers },
        });
    }
    return newStore;
}
