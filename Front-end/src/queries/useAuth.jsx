import { QUERY_KEYS } from '../constants/query-key.constant';
import { signInApi, signUpApi } from '../apis/auth.api';
import { useMutation } from 'react-query';

function useSignIn() {
    return useMutation({
        mutationKey: QUERY_KEYS.AUTH_SIGN_IN_KEY,
        mutationFn: signInApi,
    });
}

function useSignUp() {
    return useMutation({
        mutationKey: QUERY_KEYS.AUTH_SIGN_UP_KEY,
        mutationFn: signUpApi,
    });
}

export { useSignIn, useSignUp };
