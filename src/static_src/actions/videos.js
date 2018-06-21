import { CALL_API, getJSON } from 'redux-api-middleware';
import { normalize } from 'normalizr';

import { video } from './../utils/schemas';
import {CHANGE_ROUTE} from "./routes";

export const START_VIDEO_LOADING = 'START_VIDEO_LOADING';
export const SUCCESS_VIDEO_LOADING = 'SUCCESS_VIDEO_LOADING';
export const ERROR_VIDEO_LOADING = 'ERROR_VIDEO_LOADING';
export const CREATE_VIDEO = 'CREATE_VIDEO';


export const loadVideos = (url) => {
    return {
        [CALL_API]: {
            credentials: 'include',
            endpoint: url,
            method: 'GET',
            types: [
                START_VIDEO_LOADING,
                {
                    type: SUCCESS_VIDEO_LOADING,
                    payload: (action, state, res) => {
                        return getJSON(res).then(
                            (json) => {
                                console.log(normalize(json, [video]))
                                return Object.assign({}, normalize(json, [video]));
                            },
                        );
                    },
                },
                ERROR_VIDEO_LOADING,
            ],
        },
    };
};

export const createVideo = (value) => {
    return {
        type: CREATE_VIDEO,
        payload: {
            value,
        },
    }
};
























// import { CALL_API, apiMiddleware, getJSON } from 'redux-api-middleware';
// [CALL_API]: {
//     credentials: 'include',
//     endpoint: '/api/videos/',
//     method: 'GET',
//     types: [
//         'REQUEST',
//         {
//             type: 'SUCCESS',
//             payload: (action, state, res) => {
//                 return getJSON(res).then(
//                     (json) => {
//                         const normalizedData = normalize(json.results, [video]);
//                         delete json.results;
//                         return Object.assign({}, json, normalizedData);
//                     },
//                 );
//             },
//         },
//         'FAILURE',
//     ],
// },
