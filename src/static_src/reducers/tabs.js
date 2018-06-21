import update from 'react-addons-update';
import { CHANGE_ROUTE } from '../actions/routes';


const initialState = {
    value: 1,
};

export default function tabs(store = initialState, action) {
    const newStore = store;
    switch (action.type) {
        case CHANGE_ROUTE: {
            return update(store, {
                value: { $set: action.payload.value },
            });
        }
        case '@@router/LOCATION_CHANGE': {
            if (action.payload.pathname === '/feed/') {
                return update(store, {
                    value: { $set: 0 },
                });
            }
            else if (action.payload.pathname === '/courses/') {
                return update(store, {
                    value: { $set: 1 },
                });
            }
            else if (action.payload.pathname === '/videos/') {
                return update(store, {
                    value: { $set: 2 },
                });
            }
            else if (action.payload.pathname === '/collections/') {
                return update(store, {
                    value: { $set: 3 },
                });
            }
        }
        default:
            return newStore;
    }
}
