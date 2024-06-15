import PropTypes from 'prop-types';
import Trigger from './_components/Trigger';
import Display from './_components/Display';
import { useEffect, useRef, useState } from 'react';
import EVENTS from '../../../constants/event.constant';

function Tooltip({
    TriggerComponent,
    DisplayComponent,
    position,
    delay = null,
    animation,
    hasDefaultStyle,
    spaces,
    animationTime = 400,
    clickOnShow,
}) {
    const [isShownDisplay, setIsShownDisplay] = useState(false);
    const [isHiddenWithAnimation, setIsHiddenWithAnimation] =
        useState(false);
    const timeID = useRef(null);
    const ref = useRef(null);

    const handleShowDisplay = () => {
        setIsHiddenWithAnimation(false);

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

        setIsHiddenWithAnimation(true);

        if (!delay) {
            return setTimeout(() => {
                setIsShownDisplay(false);
            }, animationTime);
        }

        timeID.current = setTimeout(() => {
            setIsShownDisplay(false);
        }, delay);
    };

    useEffect(() => {
        window.addEventListener(
            EVENTS.TOOLTIP_HIDDEN,
            handleHiddenDisplay
        );

        return () => {
            window.removeEventListener(
                EVENTS.TOOLTIP_HIDDEN,
                handleHiddenDisplay
            );
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* Shown display by clicking or hovering over the trigger */
    return (
        <div
            className='tooltip'
            id='tooltip'
            ref={ref}>
            <Trigger
                clickOnShow={clickOnShow}
                handleHiddenDisplay={handleHiddenDisplay}
                handleShowDisplay={handleShowDisplay}
                isShownDisplay={isShownDisplay}>
                {TriggerComponent()}
            </Trigger>

            {isShownDisplay && (
                <Display
                    position={position}
                    animationTime={animationTime}
                    isHiddenWithAnimation={isHiddenWithAnimation}
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
    spaces: PropTypes.object,
    hoverOnShown: PropTypes.bool,
    clickOnShown: PropTypes.bool,
    delay: PropTypes.number,
    animation: PropTypes.string,
    hasDefaultStyle: PropTypes.bool,
    clickOnShow: PropTypes.bool,
    animationTime: PropTypes.number,
};

export default Tooltip;
