import PropTypes from 'prop-types';
import { useRef } from 'react';
import { clsx } from 'clsx';
import { useMemo } from 'react';
function Display({
    children,
    position,
    spaces,
    animationTime,
    hasDefaultStyle,
    isHiddenWithAnimation,
}) {
    const ref = useRef(null);

    /* Set up position of display component */
    const positions = useMemo(() => {
        const RStyles = {
            top: 'auto',
            left: 'auto',
            right: 'auto',
            bottom: 'auto',
        };

        const RSpaces = {
            bottom:
                spaces?.bottom && spaces.bottom && spaces.bottom !== 0
                    ? spaces.bottom
                    : 10,

            top:
                spaces?.top && spaces.top && spaces.top !== 0
                    ? spaces.top
                    : 10,

            right:
                spaces?.right && spaces.right && spaces.right !== 0
                    ? spaces.right
                    : 10,

            left:
                spaces?.left && spaces.left && spaces.left !== 0
                    ? spaces.left
                    : 10,
        };

        switch (position) {
            case 'bottom-right': {
                RStyles.top = `calc(100% + ${RSpaces.bottom}px`;
                RStyles.right = `calc(0px + ${RSpaces.right}px)`;
                break;
            }

            case 'bottom-left': {
                RStyles.top = `calc(100% + ${RSpaces.bottom}px)`;
                RStyles.left = `calc(0px + ${RSpaces.left}px)`;
                break;
            }

            default: {
                break;
            }
        }

        return RStyles;
    }, [position, spaces]);

    return (
        <div
            className={clsx({
                'tooltip-display': true,
                'default-style': hasDefaultStyle,
                hidden: isHiddenWithAnimation,
            })}
            style={{
                ...positions,
                animationDuration: `${animationTime}ms`,
            }}
            ref={ref}>
            {children}
        </div>
    );
}

Display.propTypes = {
    children: PropTypes.element,
    position: PropTypes.string,
    spaces: PropTypes.object,
    animationTime: PropTypes.number,
    hasDefaultStyle: PropTypes.bool,
    delay: PropTypes.number,
    isHiddenWithAnimation: PropTypes.bool,
};

export default Display;
