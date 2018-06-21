import update from "react-addons-update";
import {ERROR_COURSE_LOADING, START_COURSE_LOADING, SUCCESS_COURSE_LOADING} from "../actions/courses";
import {CHANGE_ROUTE} from "../actions/routes";

export const tabs = store => next => (action) => {
    switch (action.type) {
        case '@@router/LOCATION_CHANGE': {
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
        default:
            return newStore;
    }
    const result = next(action);
    return result;
};
