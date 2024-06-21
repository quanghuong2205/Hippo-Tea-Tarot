import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useId, useState } from 'react';
import { FaCheck } from 'react-icons/fa6';

function CheckBoxInput({
    checked,
    onChange,
    labelTitle,
    LabelComponent,
    hasCheckedStateOutside,
}) {
    const id = useId();
    const [isChecked, setIsChecked] = useState(false);
    return (
        <label
            className={clsx({
                'form-checkbox': true,
                checked: hasCheckedStateOutside ? checked : isChecked,
            })}>
            <div className='form-checkbox__icon'>
                <FaCheck />
            </div>
            <input
                onChange={(e) => {
                    onChange && onChange(e);
                    !hasCheckedStateOutside &&
                        setIsChecked((prev) => !prev);
                }}
                id={id}
                className='form-checkbox__input'
                type='checkbox'
                hidden
            />
            <div className='form-checkbox__label'>
                {labelTitle && <span>{labelTitle}</span>}
                {LabelComponent && LabelComponent()}
            </div>
        </label>
    );
}

CheckBoxInput.propTypes = {
    LabelComponent: PropTypes.func,
    checked: PropTypes.bool,
    hasCheckedStateOutside: PropTypes.bool,
    labelTitle: PropTypes.string,
    onChange: PropTypes.func,
};

export default CheckBoxInput;
