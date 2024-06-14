import PropTypes from 'prop-types';
import { clsx } from 'clsx';

function Overlay({
    isFixed = true,
    isShown = true,
    colorBG,
    onClick,
    animationTime,
    zIndex = 20,
}) {
    return (
        <div
            onClick={onClick}
            className={clsx({
                overlay: true,
                shown: isShown,
            })}
            style={{
                position: isFixed ? 'fixed' : 'absolute',
                backgroundColor: colorBG ? colorBG : 'rgba(0, 0, 0, 0.15)',
                animationDuration: `${animationTime}ms`,
                transitionDuration: `${animationTime}ms`,
                zIndex,
            }}></div>
    );
}

Overlay.propTypes = {
    isFixed: PropTypes.bool,
    colorBG: PropTypes.string,
    isShown: PropTypes.bool,
    onClick: PropTypes.func,
    animationTime: PropTypes.number,
    zIndex: PropTypes.number,
};

export default Overlay;
