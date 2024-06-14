import PropTypes from 'prop-types';
import { useId } from 'react';
import clsx from 'clsx';

function InputBox({
    type = 'text',
    labelTitle,
    value,
    placeholder,
    onChange,
    isError,
    errorText,
    hasErrorTag,
    isTextArea = false,
    classNames = {
        wrap: 'form__text-input',
        input: 'form__input',
        label: '',
    },
    hasLabel,
    LabelIcon,
    inputProps = {
        hidden: false,
    },
}) {
    const randomID = useId();

    return (
        <div className={classNames.wrap}>
            {hasLabel && (
                <label
                    className={classNames.label}
                    htmlFor={randomID}>
                    {LabelIcon && <LabelIcon />}
                    <span>{labelTitle}</span>
                </label>
            )}
            {!isTextArea ? (
                <input
                    onChange={onChange}
                    type={type}
                    className={classNames.input}
                    placeholder={placeholder}
                    id={randomID}
                    value={value}
                    hidden={inputProps?.hidden}
                    accept={inputProps?.accept}
                    multiple={inputProps?.multiple}
                />
            ) : (
                <textarea
                    onChange={onChange}
                    type={type}
                    className={classNames.input}
                    placeholder={placeholder}
                    id={randomID}
                    value={value}></textarea>
            )}
            {hasErrorTag && (
                <span
                    className={clsx({
                        error: isError,
                        'no-error': !isError,
                    })}>
                    {errorText && errorText}
                </span>
            )}
        </div>
    );
}

InputBox.propTypes = {
    placeholder: PropTypes.string,
    type: PropTypes.string,
    errorText: PropTypes.string,
    labelTitle: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    isError: PropTypes.bool,
    hasErrorTag: PropTypes.bool,
    hasLabel: PropTypes.bool,
    classNames: PropTypes.object,
    isTextArea: PropTypes.bool,
    hiddenInput: PropTypes.bool,
    LabelIcon: PropTypes.func,
    inputProps: PropTypes.object,
};

export default InputBox;
