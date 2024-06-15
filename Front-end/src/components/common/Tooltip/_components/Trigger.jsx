import PropTypes from 'prop-types';
import { memo } from 'react';
const Trigger = memo(function Trigger({
    children,
    clickOnShow,
    isShownDisplay,
    handleShowDisplay,
    handleHiddenDisplay,
}) {
    return (
        <div
            onClick={
                clickOnShow
                    ? isShownDisplay
                        ? handleHiddenDisplay
                        : handleShowDisplay
                    : null
            }
            onMouseEnter={!clickOnShow ? handleShowDisplay : null}
            onMouseLeave={!clickOnShow ? handleHiddenDisplay : null}
            className='tooltip-trigger'>
            {children}
        </div>
    );
});

Trigger.propTypes = {
    children: PropTypes.element,
    setCoords: PropTypes.func,
    handleShowDisplay: PropTypes.func,
    handleHiddenDisplay: PropTypes.func,
    clickOnShow: PropTypes.bool,
    isShownDisplay: PropTypes.bool,
};

export default Trigger;
