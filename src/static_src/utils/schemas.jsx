import { schema } from 'normalizr';

export const currentUser = new schema.Entity('currentUser');


export const lecturer = new schema.Entity('lecturers');
export const user = new schema.Entity('users');
export const course = new schema.Entity('courses', {
    lecturers: [lecturer],
});


export const video = new schema.Entity('videos', {
    video_course: course,
    author: user,
});
