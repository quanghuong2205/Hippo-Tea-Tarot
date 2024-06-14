import PropTypes from 'prop-types';
import Trigger from './_components/Trigger';
import Display from './_components/Display';
import { useEffect, useRef, useState } from 'react';

function Tooltip({
    TriggerComponent,
    DisplayComponent,
    position,
    clickOnShown,
    delay = null,
    animation,
    shownByEvent,
    eventName,
    hasDefaultStyle,
    spaces,
}) {
    const [triggerCoords, setTriggerCoords] = useState(null);
    const [isShownDisplay, setIsShownDisplay] = useState(false);
    const timeID = useRef(null);

    const setCoords = ({ coords }) => {
        if (!triggerCoords) {
            return setTriggerCoords(coords);
        }

        const coordKeys = Object.keys(coords);

        if (coordKeys.length === 0) return;

        for (let i = 0; i < coordKeys.length; i++) {
            if (coords[coordKeys[i]] !== triggerCoords[coordKeys[i]]) {
                setTriggerCoords(coords);
                break;
            }
        }
    };

    const handleShowDisplay = () => {
        if (!delay) {
            return setIsShownDisplay(true);
        }

        timeID.current = setTimeout(() => {
            setIsShownDisplay(true);

            timeID.current = null;
        }, delay);
    };

    const handleHiddenDisplay = () => {
        if (timeID.current) {
            timeID.current = null;
            clearTimeout(timeID.current);
            return;
        }

        if (!delay) {
            return setIsShownDisplay(false);
        }

        timeID.current = setTimeout(() => {
            setIsShownDisplay(false);
        }, delay);
    };

    /**
     * Show display by listen to event
     * TriggerComponent will be trigger event and pass its coords
     */

    /* Listen to event to get coords of trigger */
    useEffect(() => {
        if (!shownByEvent || !eventName) return;

        const eventHandler = (e) => {
            const coords = e.detail?.coords;

            if (coords) {
                setCoords({ coords: coords });
            }

            isShownDisplay ? handleHiddenDisplay() : handleShowDisplay();
        };

        /* Registe event */
        window.addEventListener(eventName, eventHandler);

        /* Remove event */
        return () => {
            window.removeEventListener(eventName, eventHandler);
        };
    });

    if (shownByEvent) {
        if (!eventName) {
            throw new Error('Not provide eventName');
        }
        return (
            <>
                {isShownDisplay && (
                    <Display
                        delay={delay || 0}
                        triggerCoords={triggerCoords}
                        position={position}
                        spaces={spaces}
                        animation={animation}
                        hasDefaultStyle={hasDefaultStyle}>
                        {DisplayComponent()}
                    </Display>
                )}
            </>
        );
    }

    /* Shown display by clicking or hovering over the trigger */
    return (
        <div className='tooltip'>
            <Trigger
                setCoords={setCoords}
                handleHiddenDisplay={handleHiddenDisplay}
                handleShowDisplay={handleShowDisplay}
                isShownDisplay={isShownDisplay}
                clickOnShown={clickOnShown}>
                {TriggerComponent()}
            </Trigger>

            {isShownDisplay && (
                <Display
                    triggerCoords={triggerCoords}
                    position={position}
                    spaces={spaces}
                    animation={animation}
                    hasDefaultStyle={hasDefaultStyle}>
                    {DisplayComponent()}
                </Display>
            )}
        </div>
    );
}

Tooltip.propTypes = {
    DisplayComponent: PropTypes.func,
    TriggerComponent: PropTypes.func,
    position: PropTypes.string,
    eventName: PropTypes.string,
    spaces: PropTypes.object,
    hoverOnShown: PropTypes.bool,
    clickOnShown: PropTypes.bool,
    shownByEvent: PropTypes.bool,
    delay: PropTypes.number,
    animation: PropTypes.string,
    hasDefaultStyle: PropTypes.bool,
};

export default Tooltip;
