import update from 'react-addons-update';
import {CHANGE_ROUTE} from "../actions/routes";


const initialState = {
    value: 1,
};

export default function tabs(store = initialState, action) {
    let newStore = store;
    switch (action.type) {
        case CHANGE_ROUTE: {
            return update(store, {
                value: { $set: action.payload.value},
            });
        }
        default:
            return newStore;
    }
}
