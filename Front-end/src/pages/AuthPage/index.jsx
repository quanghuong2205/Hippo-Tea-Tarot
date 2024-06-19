import { useState } from 'react';
import LeftAuth from './LeftAuth';
import RightAuth from './RightAuth';
import { AUTH_MODES } from '../../constants/auth.constant';
import useAuthField from '../../hooks/useAuthField';

function AuthPage() {
    const [authMode, setAuthMode] = useState(AUTH_MODES.SIGN_IN);
    const [errorText, setErrorText] = useState(null);
    const {
        handleClearErrorFields,
        authFields,
        fieldValues,
        handleFillField,
        handleValidateSignUpFields,
        handleValidateSignInFields,
    } = useAuthField();

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
        </div>
    );
}

export default AuthPage;
