import PropTypes from 'prop-types';
import Button from '../../../components/atoms/Button';
import { useSignIn } from '../../../queries/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import authActions from '../../../redux/actions/action.auth';
import { AUTH_FIELDS } from '../../../constants/auth.constant';
import { FaGoogle } from 'react-icons/fa';
import { FaFacebookF } from 'react-icons/fa';
import MediaLoading from '../../../components/loaders/MediaLoading';

function SignIn({ fields, setErrorText, handleValidate }) {
    const [longLoadingTime, setLongLoadingTime] = useState(false);

    /* Dispatcher */
    const dispatcher = useDispatcher();

    /* Router */
    const navigate = useNavigate();
    const location = useLocation();

    /* Sign in query */
    const { isLoading, isSuccess, error, data, mutate, reset } =
        useSignIn();

    const handleSignIn = async () => {
        /**
         * Validate fields
         */
        const areAllValidFields = await handleValidate();

        /**
         * All fields are passed validations
         */
        if (areAllValidFields) {
            /**
             * Sign up
             */
            mutate({
                email: fields[AUTH_FIELDS.EMAIL],
                password: fields[AUTH_FIELDS.PASSWORD],
            });

            setTimeout(() => setLongLoadingTime(true), 2000);
        }
    };

    useEffect(() => {
        /* Got Error */
        if (error) {
            setErrorText('Taì khoản hoặc mật khẩu không chính xác');
            reset();
        }

        if (isSuccess) {
            /* Hidden error */
            setErrorText(null);

            /* Hidden loading time text */
            setLongLoadingTime(false);

            /* Dispatch auth */
            dispatcher.signInDispatcher(data);

            /* Redirect to home page */
            const redirectTo = location.state?.redirectTo || '/menu';
            setTimeout(() => navigate(redirectTo), 0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess, error]);

    return (
        <>
            {isLoading && (
                <MediaLoading
                    descText={
                        'Server đang đang xử lý yêu cầu đăng nhập của bạn. Vui lòng kiên nhẫn đợi trong giây lát...'
                    }
                    isShownDescText={longLoadingTime}
                />
            )}

            <div className='auth-form__btn-group'>
                <Button
                    onClick={handleSignIn}
                    className='form__btn pri-btn'>
                    <span> Đăng nhập </span>
                </Button>

                <button className='form__btn outline-btn'>
                    <FaGoogle />
                    Sign in with Gmail
                </button>

                <button className='form__btn outline-btn'>
                    <FaFacebookF />
                    Sign in with Facebook
                </button>

                <button
                    onClick={() => {
                        navigate('/menu');
                    }}
                    className='form__btn outline-btn'>
                    Use without account
                </button>
            </div>
        </>
    );
}

/* Prop types */
SignIn.propTypes = {
    fields: PropTypes.object,
    setErrorText: PropTypes.func,
    handleValidate: PropTypes.func,
};

/**
 * Dispatcher
 */
function useDispatcher() {
    /* Dispatcher */
    const dispatch = useDispatch();

    return {
        signInDispatcher: (data) =>
            dispatch(authActions.signInAction(data)),
    };
}

export default SignIn;
