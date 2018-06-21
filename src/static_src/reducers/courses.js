import update from 'react-addons-update';
import { START_COURSE_LOADING, SUCCESS_COURSE_LOADING, ERROR_COURSE_LOADING, CREATE_COURSE } from '../actions/courses';


const initialState = {
    courseList: [],
    courses: {},
    isLoading: false,
};


export default function courses(store = initialState, action) {
    let newStore = store;
    if (action.payload && action.payload.entities && action.payload.entities.courses) {
        newStore = update(store, {
            courses: { $merge: action.payload.entities.courses },

        });
    }

    switch (action.type) {
        case START_COURSE_LOADING: {
            return update(newStore, {
                isLoading: { $set: true },
            });
        }
        case SUCCESS_COURSE_LOADING: {
            return update(newStore, {
                isLoading: { $set: false },
                courseList: { $set: action.payload.result },
            });
        }
        case ERROR_COURSE_LOADING: {
            return update(newStore, {
                isLoading: { $set: false },
            });
        }
        case CREATE_COURSE: {
            const course = {
                [action.payload.value.id]: action.payload.value,
            };
            const courseId = {
                [action.payload.value.id]: action.payload.value.id,
            };
            return update(newStore, {
                courses: { $merge: course },
                courseList: { $merge: courseId },

            });
        }
        default:
            return newStore;
    }
}
