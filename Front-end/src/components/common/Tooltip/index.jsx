import PropTypes from 'prop-types';
import Trigger from './_components/Trigger';
import Display from './_components/Display';
import { useEffect, useRef, useState } from 'react';

function Tooltip({
    TriggerComponent,
    DisplayComponent,
    position,
    delay = null,
    animation,
    hasDefaultStyle,
    spaces,
    clickOnShow,
    animationTime = 400,
}) {
    const [isShownDisplay, setIsShownDisplay] = useState(false);
    const [isAnimatedBeforeHidden, setIsAnimatedBeforeHidden] =
        useState(false);
    const timeID = useRef(null);
    const ref = useRef(null);

    const handleShowDisplay = () => {
        setIsAnimatedBeforeHidden(false);

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

        setIsAnimatedBeforeHidden(true);

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
        if (!clickOnShow) return;

        const clickEventHandler = (e) => {
            if (!isShownDisplay) return;
            if (!ref.current.contains(e.target)) {
                handleHiddenDisplay();
            }
        };

        window.addEventListener('click', clickEventHandler);

        return () => {
            if (!clickOnShow) return;

            window.removeEventListener('click', clickEventHandler);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isShownDisplay]);

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
                    isAnimatedBeforeHidden={isAnimatedBeforeHidden}
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
