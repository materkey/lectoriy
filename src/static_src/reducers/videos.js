import update from 'react-addons-update';
import { START_VIDEO_LOADING, SUCCESS_VIDEO_LOADING, ERROR_VIDEO_LOADING, CREATE_VIDEO } from '../actions/videos';


const initialState = {
    videoList: [],
    videos: {},
    isLoading: false,
};


export default function videos(store = initialState, action) {
    let newStore = store;
    if (action.payload && action.payload.entities && action.payload.entities.videos) {
        newStore = update(store, {
            videos: { $merge: action.payload.entities.videos },

        });
    }

    switch (action.type) {
        case START_VIDEO_LOADING: {
            return update(newStore, {
                isLoading: { $set: true },
            });
        }
        case SUCCESS_VIDEO_LOADING: {
            return update(newStore, {
                isLoading: { $set: false },
                videoList: { $set: action.payload.result },
            });
        }
        case ERROR_VIDEO_LOADING: {
            return update(newStore, {
                isLoading: { $set: false },
            });
        }
        case CREATE_VIDEO: {
            const video = {
                [action.payload.value.id]: action.payload.value,
            };
            const videoId = {
                [action.payload.value.id]: action.payload.value.id,
            };
            return update(newStore, {
                videos: { $merge: video },
                videoList: { $merge: videoId },

            });
        }
        default:
            return newStore;
    }
}
