import PropTypes from 'prop-types';
import { Fragment } from 'react';
import Button from '../../../components/atoms/Button';
import { AUTH_MODES } from '../../../constants/auth.constant';

function AuthLink({ isSignIn, switchAuthMode }) {
    return (
        <div className='auth-form__footer'>
            {isSignIn ? (
                <Fragment>
                    <p className='form__text'>
                        Bạn chưa đăng kí tài khoản?
                    </p>
                    <Button
                        onClick={switchAuthMode(
                            AUTH_MODES.SIGN_UP
                        )}
                        className={'form__link auth-form__link'}>
                        <span>Đăng kí ngay</span>
                    </Button>
                </Fragment>
            ) : (
                <Fragment>
                    <p className='form__text'>
                        Bạn đã có tài khoản ?
                    </p>
                    <Button
                        onClick={switchAuthMode(
                            AUTH_MODES.SIGN_IN
                        )}
                        className={'form__link auth-form__link'}>
                        <span>Đăng nhập ngay</span>
                    </Button>
                </Fragment>
            )}
        </div>
    );
}

AuthLink.propTypes = {
    isSignIn: PropTypes.bool,
    switchAuthMode: PropTypes.func,
};

export default AuthLink;
