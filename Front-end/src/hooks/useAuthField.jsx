import { useState, useMemo } from 'react';
import validate from '../helpers/validation.helder';
import { AUTH_FIELDS } from '../constants/auth.constant';

function useAuthField() {
    const [authFields, setAuthFields] = useState({
        [AUTH_FIELDS.NAME]: {
            value: 'quanghuong',
            isError: false,
            errorMessage: '',
        },

        [AUTH_FIELDS.EMAIL]: {
            value: 'quanghuong@gmail.com',
            isError: false,
            errorMessage: '',
        },

        [AUTH_FIELDS.PASSWORD]: {
            value: 'quanghuong',
            isError: false,
            errorMessage: '',
        },

        [AUTH_FIELDS.CONFIRM_PASSWORD]: {
            value: 'quanghuong',
            isError: false,
            errorMessage: '',
        },
    });

    /**
     *
     * @desc Fill equivelent field when typing
     * @param {string} fieldName - Name of field to be filled
     */
    const handleFillField = (fieldName) => {
        return (event) => {
            const fieldValue = event.target.value;
            setAuthFields((prev) => {
                return {
                    ...prev,
                    [fieldName]: {
                        ...prev[fieldName],
                        value: fieldValue,
                    },
                };
            });
        };
    };

    /**
     *
     * @desc Get the value of all fields
     */
    const fieldValues = useMemo(() => {
        const fieldValues = {};

        Object.keys(authFields).forEach((fieldKey) => {
            fieldValues[fieldKey] = authFields[fieldKey].value;
        });

        return fieldValues;
    }, [authFields]);

    const handleClearErrorFields = () => {
        /* Reset error message */
        setAuthFields((prev) => {
            const newAuthFields = { ...prev };
            const fieldKeys = Object.keys(newAuthFields);

            /* Reset error state of fields */
            fieldKeys.forEach((fieldKey) => {
                newAuthFields[fieldKey] = {
                    ...newAuthFields[fieldKey],
                    isError: false,
                    errorMessage: '',
                };
            });

            return newAuthFields;
        });
    };

    /**
     *
     * @desc Validate each fields
     */
    const handleValidateSignUpFields = async () => {
        const validationResults = await validate([
            {
                rules: ['isRequired'],
                fieldName: AUTH_FIELDS.NAME,
                fieldValue: authFields[AUTH_FIELDS.NAME].value,
                options: {
                    fieldName: 'name',
                },
            },

            {
                rules: ['isRequired', 'isEmail'],
                fieldName: AUTH_FIELDS.EMAIL,
                fieldValue: authFields[AUTH_FIELDS.EMAIL].value,
                options: {
                    fieldName: 'email',
                },
            },

            {
                rules: ['isRequired', 'isMinLength', 'isMaxLength'],
                fieldName: AUTH_FIELDS.PASSWORD,
                fieldValue: authFields[AUTH_FIELDS.PASSWORD].value,
                options: {
                    maxLength: 16,
                    minLength: 8,
                    fieldName: 'password',
                },
            },

            {
                rules: ['isRequired', 'confirmPassword'],
                fieldName: AUTH_FIELDS.CONFIRM_PASSWORD,
                fieldValue: authFields[AUTH_FIELDS.CONFIRM_PASSWORD].value,
                options: {
                    confirmedPassword:
                        authFields[AUTH_FIELDS.PASSWORD].value,
                    fieldName: 'confirm-password',
                },
            },
        ]);

        /* Reset error message */
        handleClearErrorFields();

        /**
         * All fields are valid
         */
        if (validationResults.length === 0) return true;

        /**
         * Handle invalid fields
         */
        setAuthFields((prev) => {
            const newAuthFields = { ...prev };
            /* Set new error state of fields */
            validationResults.forEach((result) => {
                newAuthFields[result.fieldName] = {
                    ...newAuthFields[result.fieldName],
                    errorMessage: result.error,
                    isError: true,
                };
            });

            return newAuthFields;
        });
    };

    /**
     *
     * @desc Validate each fields
     */
    const handleValidateSignInFields = async () => {
        const validationResults = await validate([
            {
                rules: ['isRequired', 'isEmail'],
                fieldName: AUTH_FIELDS.EMAIL,
                fieldValue: authFields[AUTH_FIELDS.EMAIL].value,
                options: {
                    fieldName: 'email',
                },
            },

            {
                rules: ['isRequired'],
                fieldName: AUTH_FIELDS.PASSWORD,
                fieldValue: authFields[AUTH_FIELDS.PASSWORD].value,
                options: {
                    fieldName: 'password',
                },
            },
        ]);

        /* Reset error message */
        handleClearErrorFields();

        /**
         * All fields are valid
         */
        if (validationResults.length === 0) return true;

        /**
         * Handle invalid fields
         */
        setAuthFields((prev) => {
            const newAuthFields = { ...prev };
            /* Set new error state of fields */
            validationResults.forEach((result) => {
                newAuthFields[result.fieldName] = {
                    ...newAuthFields[result.fieldName],
                    errorMessage: result.error,
                    isError: true,
                };
            });

            return newAuthFields;
        });
    };

    return {
        authFields,
        handleFillField,
        fieldValues,
        handleValidateSignUpFields,
        handleValidateSignInFields,
        handleClearErrorFields,
    };
}

export default useAuthField;
