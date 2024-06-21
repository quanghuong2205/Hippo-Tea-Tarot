import PropTypes from 'prop-types';
import InputBox from '../../components/atoms/InputBox';
import AuthLink from './_components/AuthLink';
import SignIn from './_components/SignIn';
import SignUp from './_components/SignUp';
import RememberMe from './_components/RememberMe';
import RecoveryPass from './_components/RecoveryPass';
import { IoIosWarning } from 'react-icons/io';

import { AUTH_MODES, AUTH_FIELDS } from '../../constants/auth.constant';
import MailIcon from '../../components/icons/MailIcon';
import LockIcon from '../../components/icons/LockIcon';

function RightAuth({
    authMode,
    switchAuthMode,
    setErrorText,
    errorText,
    authFieldBox,
}) {
    /**
     * STATES
     */
    const isSignIn = authMode === AUTH_MODES.SIGN_IN;

    /**
     * HOOKS
     */
    const {
        authFields,
        fieldValues,
        handleFillField,
        handleValidateSignUpFields,
        handleValidateSignInFields,
    } = authFieldBox;
    /**
     * HANDLERS
     */

    return (
        <div className='auth-right auth-right--no-translate'>
            <div className='auth-right__inner'>
                {/* Header */}
                <header>
                    <h1 className='auth-right__heading'>Xin chào bạn</h1>
                    <p className='auth-right__desc'>
                        Bạn đang thực hiện{' '}
                        {isSignIn ? 'đăng nhập' : 'đăng kí'}
                    </p>
                </header>

                {/* Form */}
                <form className='form auth-form'>
                    {!isSignIn && (
                        <InputBox
                            onChange={handleFillField(AUTH_FIELDS.NAME)}
                            type='text'
                            placeholder={'Tên người dùng'}
                            isError={authFields[AUTH_FIELDS.NAME].isError}
                            errorText={
                                authFields[AUTH_FIELDS.NAME].errorMessage
                            }
                            value={authFields[AUTH_FIELDS.NAME].value}
                            hasErrorTag
                            LabelIcon={() => null}
                            hasLabel
                        />
                    )}

                    <InputBox
                        onChange={handleFillField([AUTH_FIELDS.EMAIL])}
                        placeholder={'Email'}
                        isError={authFields[AUTH_FIELDS.EMAIL].isError}
                        errorText={
                            authFields[AUTH_FIELDS.EMAIL].errorMessage
                        }
                        value={authFields[AUTH_FIELDS.EMAIL].value}
                        hasErrorTag
                        LabelIcon={() => <MailIcon />}
                        hasLabel
                    />

                    <InputBox
                        onChange={handleFillField([AUTH_FIELDS.PASSWORD])}
                        type='password'
                        placeholder={'Mật khẩu'}
                        isError={authFields[AUTH_FIELDS.PASSWORD].isError}
                        errorText={
                            authFields[AUTH_FIELDS.PASSWORD].errorMessage
                        }
                        value={authFields[AUTH_FIELDS.PASSWORD].value}
                        hasErrorTag
                        LabelIcon={() => <LockIcon />}
                        hasLabel
                    />

                    {/* More fields for sign up */}
                    {!isSignIn && (
                        <InputBox
                            onChange={handleFillField([
                                AUTH_FIELDS.CONFIRM_PASSWORD,
                            ])}
                            type='password'
                            placeholder={'Nhập lại mật khẩu'}
                            isError={
                                authFields[AUTH_FIELDS.CONFIRM_PASSWORD]
                                    .isError
                            }
                            errorText={
                                authFields[AUTH_FIELDS.CONFIRM_PASSWORD]
                                    .errorMessage
                            }
                            value={
                                authFields[AUTH_FIELDS.CONFIRM_PASSWORD]
                                    .value
                            }
                            hasErrorTag
                            LabelIcon={() => <LockIcon />}
                            hasLabel
                        />
                    )}

                    {/* Options */}
                    <div className='form__group--inline auth-form__group'>
                        {!isSignIn && <RememberMe />}
                        <RecoveryPass />
                    </div>

                    {/* Auth submit  */}
                    {isSignIn ? (
                        <SignIn
                            fields={fieldValues}
                            setErrorText={setErrorText}
                            handleValidate={handleValidateSignInFields}
                        />
                    ) : (
                        <SignUp
                            fields={authFields}
                            setErrorText={setErrorText}
                            switchAuthMode={switchAuthMode}
                            handleValidate={handleValidateSignUpFields}
                        />
                    )}
                </form>

                {/* Error */}
                {errorText && (
                    <div className='form__error'>
                        <IoIosWarning />
                        <span>{errorText}</span>
                    </div>
                )}

                {/* Auth link */}
                <AuthLink
                    isSignIn={isSignIn}
                    switchAuthMode={switchAuthMode}
                />
            </div>
        </div>
    );
}

RightAuth.propTypes = {
    authMode: PropTypes.string,
    switchAuthMode: PropTypes.func,
    setErrorText: PropTypes.func,
    errorText: PropTypes.string,
    authFieldBox: PropTypes.object,
};

export default RightAuth;
