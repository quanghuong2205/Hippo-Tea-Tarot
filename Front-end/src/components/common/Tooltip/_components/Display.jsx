import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';
import { useMemo } from 'react';
function Display({
    children,
    triggerCoords,
    position,
    spaces,
    animation,
    hasDefaultStyle,
    delay,
}) {
    const ref = useRef(null);
    const [displayStyles, setDisplayStyles] = useState(null);

    /* Set up position of display component */
    const positions = useMemo(() => {
        if (!triggerCoords || !displayStyles) return {};
        const RStyles = {
            top: 'auto',
            left: 'auto',
            right: 'auto',
            bottom: 'auto',
        }; //Result Style

        const DStyles = displayStyles; //Display style

        const extraSpaces = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            ...spaces,
        };

        switch (position) {
            case 'left': {
                RStyles.top = triggerCoords.top + extraSpaces.top;
                RStyles.left =
                    triggerCoords.left - DStyles.width - extraSpaces.left;
                break;
            }

            case 'right': {
                RStyles.top = triggerCoords.top + extraSpaces.top;
                RStyles.left = triggerCoords.right + extraSpaces.right;
                break;
            }

            case 'top': {
                RStyles.top =
                    triggerCoords.top - DStyles.height - extraSpaces.top;
                RStyles.left = triggerCoords.left + extraSpaces.left;
                break;
            }

            case 'bottom': {
                RStyles.top = triggerCoords.bottom + extraSpaces.bottom;
                RStyles.left = triggerCoords.left + extraSpaces.left;
                break;
            }

            case 'bottom-right': {
                RStyles.top = triggerCoords.bottom + extraSpaces.bottom;
                RStyles.left =
                    triggerCoords.right -
                    DStyles.width -
                    extraSpaces.right;
                break;
            }

            default: {
                break;
            }
        }

        return RStyles;
    }, [triggerCoords, position, spaces, displayStyles]);

    const animationStyles = useMemo(() => {
        if (!animation) return {};

        const styles = {
            animationDuration: `300ms`,
            animationTimingFunction: 'ease-in-out',
            animationName: animation,
        };

        return styles;
    }, [animation]);

    useEffect(() => {
        const styles = getComputedStyle(ref.current);
        setDisplayStyles({
            width: parseFloat(styles.width),
            height: parseFloat(styles.height),
        });
    }, []);

    return (
        <div
            className={clsx({
                'tooltip-display': true,
                'default-style': hasDefaultStyle,
            })}
            style={{
                ...positions,
                ...animationStyles,
                animationName: 'slideUp',
            }}
            ref={ref}>
            {children}
        </div>
    );
}

Display.propTypes = {
    children: PropTypes.element,
    position: PropTypes.string,
    triggerCoords: PropTypes.object,
    spaces: PropTypes.object,
    animation: PropTypes.string,
    hasDefaultStyle: PropTypes.bool,
    delay: PropTypes.number,
};

export default Display;
