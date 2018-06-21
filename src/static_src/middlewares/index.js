import { apiMiddleware } from 'redux-api-middleware';
import { logger } from './test';
import { tabs } from './tabs';

export default [
    logger,
    apiMiddleware,
];
