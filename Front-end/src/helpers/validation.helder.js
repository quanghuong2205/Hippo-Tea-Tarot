'use strict';

/**
 * DEFINE VALIDATION RULE METHODS
 */

/**
 *
 * @param {string} value
 * @returns {boolean} True if the value not undefined
 */
const isRequired = (value) => value && value !== '';

/**
 *
 * @param {string} value
 * @returns True if the value is email format
 */
const isEmail = (value) => {
    const emailRegex =
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i;
    return emailRegex.test(value);
};

/**
 *
 * @param {string} len - minimum length to be allowed
 * @param {string} value - value to check length
 */
const isMinLength = (len, value) => {
    if (typeof len === 'string') {
        len = parseFloat(len);
    }

    return value.length >= len;
};

/**
 *
 * @param {string} len - maximum length to be allowed
 * @param {string} value - value to check length
 */
const isMaxLength = (len, value) => {
    if (typeof len === 'string') {
        len = parseFloat(len);
    }

    return value.length <= len;
};

const confirmPassword = (password, confirmedPassword) => {
    return password === confirmedPassword;
};

/**
 * @desc Handle and Controll each rule
 */
const hanldeRuleCase = ({ rule, value, options }) => {
    switch (rule) {
        case 'ISREQUIRED': {
            const isValid = isRequired(value);
            return isValid
                ? undefined
                : `Bạn không được để trống trường ${
                      options?.fieldName
                          ? options.fieldName
                          : 'này'
                  }`;
        }

        case 'ISEMAIL': {
            const isValid = isEmail(value);
            return isValid
                ? undefined
                : 'Bạn phải nhập đúng định dạng email(@gmail.com)';
        }

        case 'ISMAXLENGTH': {
            const maxLength = options?.maxLength;
            if (!maxLength) {
                throw new Error(
                    'Provide the max length to validate'
                );
            }

            const isValid = isMaxLength(maxLength, value);

            return isValid
                ? undefined
                : `Bạn chỉ có thể nhập tối đa ${maxLength} kí tự`;
        }

        case 'ISMINLENGTH': {
            const minLength = options?.minLength;
            if (!minLength) {
                throw new Error(
                    'Provide the min length to validate'
                );
            }

            const isValid = isMinLength(minLength, value);

            return isValid
                ? undefined
                : `Bạn phải nhập tối thiểu ${minLength} kí tự`;
        }

        case 'CONFIRMPASSWORD': {
            const confirmedPassword = options?.confirmedPassword;
            if (
                confirmedPassword == null ||
                confirmedPassword == undefined
            ) {
                throw new Error(
                    'Provide the confirmed password to validate'
                );
            }

            const isValid = confirmPassword(
                value,
                confirmedPassword
            );

            return isValid
                ? undefined
                : `Mật khẩu xác thực không khớp`;
        }

        default: {
            throw new Error(`Rule name ${rule} doesn't exist`);
        }
    }
};

/**
 * @desc field in the formmat -
 *      field: [rules: [], fieldName, fiedlValue, options: []]
 * @param {Array} fields - fields with necessary information
 *      to validate
 */
const validate = (fields = []) => {
    if (fields && fields.length === 0) {
        throw new Error('No validation rules are found');
    }
    /**
     * Loop through each rule
     */
    const eachRule = (rule, fieldValue, fieldOptions) => {
        return hanldeRuleCase({
            rule: rule.toUpperCase(),
            value: fieldValue,
            options: fieldOptions,
        });
    };

    return new Promise((resolve) => {
        /* Save validation results */
        const validationResults = [];

        /**
         * Loop through each field
         */
        let i = 0;
        // eslint-disable-next-line no-constant-condition
        while (true) {
            /**
             * Break condition
             */
            if (i == fields.length) {
                resolve(validationResults);
                break;
            }

            const field = fields[i];
            const rules = field?.rules;
            const fieldName = field?.fieldName;
            const fieldValue = field?.fieldValue;
            const fieldOptions = field?.options;

            /**
             * Verify provided information
             */
            if (!rules || rules.length === 0) {
                throw new Error(
                    `No rules are provided to the field ${fieldName}`
                );
            }

            /**
             * Loop through each rule
             *  and handle
             */
            for (let i = 0; i < rules.length; i++) {
                const errorMessage = eachRule(
                    rules[i],
                    fieldValue,
                    fieldOptions
                );

                if (!errorMessage) continue;

                /**
                 * Got error, just move to next field
                 */
                validationResults.push({
                    fieldName,
                    error: errorMessage,
                });
                break;
            }

            i++;
        }
    }).catch((error) => {
        throw error;
    });
};

export default validate;
