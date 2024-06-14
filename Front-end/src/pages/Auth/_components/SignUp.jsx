import PropTypes from 'prop-types';
import Button from '../../../components/atoms/Button';
import { useSignUp } from '../../../queries/useAuth';
import { AUTH_MODES } from '../../../constants/auth.constant';
import EVENTS from '../../../constants/event.constant';
import Overlay from '../../../components/common/Overlay';
import Loading from '../../../components/common/Loading';
import { useEffect, useState } from 'react';

function SignUp({ fields, setErrorText, switchAuthMode, handleValidate }) {
    const [longLoadingTime, setLongLoadingTime] = useState(false);

    /**
     * Sign up query
     */
    const { isLoading, mutate, isSuccess, error, reset, data } =
        useSignUp();

    const handleSignUp = async () => {
        /**
         * Validate fields
         */
        const areAllValidFields = await handleValidate();

        /* Hidden error */
        setErrorText('');

        /**
         * All fields are passed validations
         */
        if (areAllValidFields) {
            /**
             * Sign up
             */
            mutate({
                name: fields.name.value,
                email: fields.email.value,
                password: fields.password.value,
            });

            setTimeout(() => setLongLoadingTime(true), 2000);
        }
    };

    if (error) {
        setErrorText(
            error?.status == 409
                ? 'Người dùng đã tồn tại'
                : 'Đã xảy ra lỗi bên server'
        );

        /* Reset mutate state */
        reset();
    }

    useEffect(() => {
        if (isSuccess) {
            /* Hidden error */
            setErrorText(null);

            /* Hidden long loading text */
            setLongLoadingTime(false);

            /* Dispatch success event */
            document.dispatchEvent(
                new CustomEvent(EVENTS.SIGN_UP_SUCCESS, {
                    detail: {
                        user: data.user,
                    },
                })
            );

            /* Redirect to sign in */
            switchAuthMode(AUTH_MODES.SIGN_IN)();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess]);

    return (
        <>
            {isLoading && (
                <>
                    <Overlay colorBG={'rgba(255, 255, 255, 1)'} />
                    <div className='form-loading'>
                        <Loading />
                        {longLoadingTime && (
                            <span className='form-loading__text'>
                                Server đang đang xử lý yêu cầu đăng kí của
                                bạn. Vui lòng kiên nhẫn đợi trong giây
                                lát...
                            </span>
                        )}
                    </div>
                </>
            )}
            <div className='auth-form__btn-group'>
                <Button
                    onClick={handleSignUp}
                    className='form__btn auth-form__btn pri-btn'>
                    <span> Đăng kí </span>
                </Button>
            </div>
        </>
    );
}

SignUp.propTypes = {
    fields: PropTypes.object,
    setErrorText: PropTypes.func,
    switchAuthMode: PropTypes.func,
    handleValidate: PropTypes.func,
};

export default SignUp;
