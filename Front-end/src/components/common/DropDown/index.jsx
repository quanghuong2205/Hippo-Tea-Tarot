import PropTypes from 'prop-types';
('use strict');
import TriggerComponent from './_components/Trigger';
import ContentComponent from './_components/Content';
import { useState } from 'react';

function Dropdown({ Trigger, Content }) {
    const [isShown, setIsShown] = useState(false);
    const handleShowOrHidden = () => {
        setIsShown(!isShown);
    };

    return (
        <div className='dropdown'>
            {Trigger && (
                <TriggerComponent
                    handleShowOrHidden={handleShowOrHidden}>
                    {Trigger()}
                </TriggerComponent>
            )}
            {Content && isShown && (
                <ContentComponent>{Content()}</ContentComponent>
            )}
        </div>
    );
}

Dropdown.propTypes = {
    Content: PropTypes.func,
    Trigger: PropTypes.func,
};

export default Dropdown;
