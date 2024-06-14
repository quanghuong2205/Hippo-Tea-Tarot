'use strict';
import { appendPrefix } from '../../utils/index';

const prefix = 'auth';
let AUTH_TYPES = {
    SIGN_IN: 'sign-in',
    SIGN_OUT: 'sign-out',
    INIT_AUTH: 'init-auth',
    REFRESH_TOKEN: 'refresh-token',
};

AUTH_TYPES = appendPrefix({
    prefix: prefix,
    object: AUTH_TYPES,
});

export default AUTH_TYPES;
