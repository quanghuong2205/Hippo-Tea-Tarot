import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { getCoords } from '../../../../utils/dom.utils';
function Trigger({
    children,
    setCoords,
    clickOnShown,
    isShownDisplay,
    handleShowDisplay,
    handleHiddenDisplay,
}) {
    const ref = useRef(null);

    /**
     * Caculate the coords of trigger
     * Re-calculate whenever Display is Shown
     *  to shown display based on the newest coords
     *  of the trigger
     */
    useEffect(() => {
        const node = ref.current;
        setCoords({
            coords: getCoords({ node }),
        });
    }, [isShownDisplay, setCoords]);

    return (
        <div
            onClick={
                clickOnShown
                    ? isShownDisplay
                        ? handleHiddenDisplay
                        : handleShowDisplay
                    : null
            }
            onMouseEnter={!clickOnShown ? handleShowDisplay : null}
            onMouseLeave={!clickOnShown ? handleHiddenDisplay : null}
            className='tooltip-trigger'
            ref={ref}>
            {children}
        </div>
    );
}

Trigger.propTypes = {
    children: PropTypes.element,
    setCoords: PropTypes.func,
    handleShowDisplay: PropTypes.func,
    handleHiddenDisplay: PropTypes.func,
    clickOnShown: PropTypes.bool,
    isShownDisplay: PropTypes.bool,
};

export default Trigger;
