'use strict';
import apiBase from './base.api';

const signInApi = async ({ email, password }) => {
    return await apiBase.post(
        '/auth/signin',
        {
            email,
            password,
        },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
};

const signUpApi = async ({ email, password, name }) => {
    return await apiBase.post(
        '/auth/signup',
        {
            email,
            password,
            name,
        },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
};

const signOutApi = async () => {
    return await apiBase.post('/auth/signout');
};

const refreshTokenApi = async ({ refreshToken }) => {
    return await apiBase.post(
        'auth/refresh-token',
        {},
        {
            headers: {
                'Content-Type': 'application/json',
                'x-refresh-token': `Bear ${refreshToken}`,
            },
        }
    );
};

export { signInApi, signUpApi, refreshTokenApi, signOutApi };
