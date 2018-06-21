import { CALL_API, getJSON } from 'redux-api-middleware';
import { normalize } from 'normalizr';

import { course } from './../utils/schemas';
import {CHANGE_ROUTE} from "./routes";

export const START_COURSE_LOADING = 'START_COURSE_LOADING';
export const SUCCESS_COURSE_LOADING = 'SUCCESS_COURSE_LOADING';
export const ERROR_COURSE_LOADING = 'ERROR_COURSE_LOADING';
export const CREATE_COURSE = 'CREATE_COURSE';


export const loadCourses = (url) => {
    return {
        [CALL_API]: {
            credentials: 'include',
            endpoint: url,
            method: 'GET',
            types: [
                START_COURSE_LOADING,
                {
                    type: SUCCESS_COURSE_LOADING,
                    payload: (action, state, res) => {
                        return getJSON(res).then(
                            (json) => {
                                return Object.assign({}, normalize(json, [course]));
                            },
                        );
                    },
                },
                ERROR_COURSE_LOADING,
            ],
        },
    };
};

export const createCourse = (value) => {
    return {
        type: CREATE_COURSE,
        payload: {
            value,
        },
    }
};
























// import { CALL_API, apiMiddleware, getJSON } from 'redux-api-middleware';
// [CALL_API]: {
//     credentials: 'include',
//     endpoint: '/api/courses/',
//     method: 'GET',
//     types: [
//         'REQUEST',
//         {
//             type: 'SUCCESS',
//             payload: (action, state, res) => {
//                 return getJSON(res).then(
//                     (json) => {
//                         const normalizedData = normalize(json.results, [course]);
//                         delete json.results;
//                         return Object.assign({}, json, normalizedData);
//                     },
//                 );
//             },
//         },
//         'FAILURE',
//     ],
// },
