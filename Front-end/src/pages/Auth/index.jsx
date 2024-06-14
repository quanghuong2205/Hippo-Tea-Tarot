import { useEffect, useState } from 'react';
import LeftAuth from './LeftAuth';
import RightAuth from './RightAuth';
import { AUTH_MODES } from '../../constants/auth.constant';
import AuthPopup from './AuthPopup';
import useAuthField from '../../hooks/useAuthField';
import EVENTS from '../../constants/event.constant';

function Auth() {
    const [authMode, setAuthMode] = useState(AUTH_MODES.SIGN_IN);
    const [errorText, setErrorText] = useState(null);
    const [signUpInfor, setSignUpInfor] = useState(null);
    const {
        handleClearErrorFields,
        authFields,
        fieldValues,
        handleFillField,
        handleValidateSignUpFields,
        handleValidateSignInFields,
    } = useAuthField();

    /**
     * Listen to success sign-up event
     */
    useEffect(() => {
        const handleSignUpInfor = (event) => {
            setSignUpInfor(event.detail.user);
        };

        /* Registe event */
        window.addEventListener(EVENTS.SIGN_UP_SUCCESS, handleSignUpInfor);

        /* Remove event */
        return () => {
            window.removeEventListener(
                EVENTS.SIGN_UP_SUCCESS,
                handleSignUpInfor
            );
        };
    }, []);

    /**
     * @desc Switch auth mode
     */
    const switchAuthMode = (mode) => {
        return () => {
            setErrorText('');
            setAuthMode(mode);
            handleClearErrorFields();
        };
    };

    /**
     * @desc Set error message
     */
    const handleSetErrorText = (text) => {
        setErrorText(text);
    };

    return (
        <div className='auth'>
            <LeftAuth />
            <RightAuth
                authMode={authMode}
                switchAuthMode={switchAuthMode}
                setErrorText={handleSetErrorText}
                errorText={errorText}
                authFieldBox={{
                    authFields,
                    fieldValues,
                    handleFillField,
                    handleValidateSignUpFields,
                    handleValidateSignInFields,
                }}
            />
            {signUpInfor && (
                <AuthPopup
                    signUpInfor={signUpInfor}
                    handleCloseSideEffects={() => setSignUpInfor(null)}
                />
            )}
        </div>
    );
}

export default Auth;
